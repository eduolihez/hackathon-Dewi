// HACKATHON

#include <IRremote.h>
#include <Servo.h>
#define SENSOR_LM35_fisic // comentar si usem TMP36 (tinkercad)
#include <LiquidCrystal.h> // pantalla LCD

const int redPin = 13;
const int bluePin = 12;
const int greenPin = 11;

int receptor = 10;
int boto;
bool on = false;

Servo aixeta; // Clau de Pas de l'Aigua general habitacle
const int pinServo = 9;
int posicioAixeta = 0;   // 0 = tancada, 90 = oberta

const int pinTemp = A5;
float temperatura;

const int RS = 2, E = 3, D4 = 4, D5 = 5, D6 = 6, D7 = 7;
LiquidCrystal lcd(RS,E,D4,D5,D6,D7);
const int pinBacklight = 8; // transistor 5v led pantalla

const int pinCabal = A4; // potenciometre
float cabal = 0;

float litres = 0;
unsigned long tempsAnterior = 0;

int pantalla = 0; // 0 = res, 1 = mostrar cabal instantani, etc.

int subpantalla = 1; // de 1 a 4
unsigned long tempsPantallaAnterior = 0;

int pantallaAnterior = -2;
int subpantallaAnterior = -2;

void setup()
{
  Serial.begin(9600);
  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);
  IrReceiver.begin(receptor); // Inicialitza el receptor IR
  aixeta.attach(pinServo);
  aixeta.write(posicioAixeta);  // Inicialitza tancat
  delay(2000);         // Dona temps per arribar
  aixeta.detach();     // Allibera el servoº
  
  lcd.begin(16,2);
  pinMode(pinBacklight, OUTPUT);
  digitalWrite(pinBacklight, LOW);; // Comença apagat
}

void loop()
{
  estatSistema(on);
  boto = readInfrared();
  
  if (!on) {
    // Sistema apagat només permet encendre'l amb botó vermell
    digitalWrite(pinBacklight, LOW);
    lcd.clear();
    if (boto == 0) {
      flashBlau();
      on = true;
      estatSistema(on);
      Serial.println(on ? "SISTEMA ON" : "SISTEMA OFF");
    } else if (boto != -1) {
      flashGroc(); // Qualsevol altre botó = rebutjat
    }
  }
  else {
    ordresComandament();
    temp();
    llegirCabal();
    if (posicioAixeta == 90) { // clau de pas d'aigua obert, de moment només clau oberta o tancada
    	calcularLitres();
  	}
    
    if (pantalla == -1) lcd.clear();
    if (pantalla == 0) digitalWrite(pinBacklight, LOW);
    else if (pantalla != -1 && pantalla != 0) digitalWrite(pinBacklight, HIGH);
    
    if ((pantalla != pantallaAnterior || subpantalla != subpantallaAnterior) && pantalla != 0) {
      lcd.clear();
      pantallaAnterior = pantalla;
      subpantallaAnterior = subpantalla;
    }

      
    if (pantalla == 1)mostrarLitresAcumulats(); // dins del loop per a que s'actualitzi cada segon amb millis.
    if (pantalla == 2) mostrarCabalInstantani();
    if (pantalla == 3) mostrarEstatClau();
    if (pantalla == 4) mostrarTemperatura();
  	if (pantalla == 5) rotacioPantalles();  
    if (pantalla == 10) mostrarPantallaCanvi(posicioAixeta);
  }
}


// Funcions i Procediments

void estatSistema(bool on) {
  if(!on) ledVermell();
  else ledVerd();
}

void ledVermell() {
  	digitalWrite(redPin, HIGH);
  	digitalWrite(greenPin, LOW);
  	digitalWrite(bluePin, LOW);
}
void ledVerd() {
  	digitalWrite(redPin, LOW);
  	digitalWrite(greenPin, HIGH);
  	digitalWrite(bluePin, LOW);
}
void ledBlau() {
  	digitalWrite(redPin, LOW);
  	digitalWrite(greenPin, LOW);
  	digitalWrite(bluePin, HIGH);
}
void flashGroc() { // boto sense ordre 
  digitalWrite(redPin, HIGH);
  digitalWrite(greenPin, HIGH);
  digitalWrite(bluePin, LOW);
  delay(100); // temps del flash
  estatSistema(on);
}
void flashBlau() { // boto amb ordre
  digitalWrite(redPin, LOW);
  digitalWrite(greenPin, LOW);
  digitalWrite(bluePin, HIGH);
  delay(100);
  estatSistema(on);
}


void ordresComandament() {
  switch (boto) {
    
    case 0: flashBlau(); // ordre rebuda correcte
      	// On/Off Sistema
      	on = !on;
    	estatSistema(on);
		Serial.println(on ? "SISTEMA ON" : "SISTEMA OFF");
      	break;
    
    case 8: flashBlau(); // ordre rebuda correcte
      	// Tancar aixeta
      	if(posicioAixeta == 0) Serial.println("La clau de pas d'aigua general de l'habitacle ja esta tancat!");
    	else {
          posicioAixeta = 0;
          aixeta.attach(pinServo); // iniciar de nou ja que el desconectem cada cop, evitar tics correccions
          aixeta.write(posicioAixeta);
          delay(2000);         // Dona temps per arribar
          aixeta.detach();     // Allibera el servo
          Serial.println("Clau de pas d'aigua TANCAT");
          pantalla = 10;
          Serial.print("$Clau:");
          Serial.println(posicioAixeta);
        }
      	break;
    
    case 10: flashBlau(); // ordre rebuda correcte
      	// Obrir aixeta
      	if(posicioAixeta == 90) Serial.println("La clau de pas d'aigua general de l'habitacle ja esta obert!");
    	else {
          posicioAixeta = 90;
          aixeta.attach(pinServo);
          aixeta.write(posicioAixeta);
          delay(2000);         // Dona temps per arribar. 1,5 sec tmb
          aixeta.detach();     // Allibera el servo
          Serial.println("Clau de pas d'aigua OBERT");
          pantalla = 10;
          Serial.print("$Clau:");
          Serial.println(posicioAixeta);

        }
      	break;
    
    case 12: flashBlau(); // ordre rebuda correcte
      	// num 0 --> un cop, apagar led, dos cops, apagar pantalla.
      	if (pantalla == 0) pantalla = -1;
    	  else pantalla = 0;
      	break;
    
    case 16: flashBlau(); // ordre rebuda correcte
      	// num 1 --> mostrar cabal total
      	pantalla = 1;
      	break;
    
    case 17: flashBlau(); // ordre rebuda correcte
      	// num 2 --> mostrar cabal instantani
      	pantalla = 2;
      	break;
    
    case 18: flashBlau(); // ordre rebuda correcte
      	// num 3 --> estat clau d'aigua
      	pantalla = 3;
      	break;
    
    case 20: flashBlau(); // ordre rebuda correcte
      	// num 4 --> temperatura
      	pantalla = 4;
      	break;
    
    case 5: flashBlau(); // ordre rebuda correcte
      	// Play/Pause --> rotació pantalles
      	pantalla = 5;
      	break;
    
    

    default:
    	if (boto != -1) flashGroc(); // no té ordre el boto seleccionat
      	break;
  }
}

int readInfrared() {
  int result = -1;
  if (IrReceiver.decode()) { // Si hi ha un senyal IR disponible
    unsigned long code = IrReceiver.decodedIRData.decodedRawData;
	result = mapCodeToButton(code); // Convertim el codi a un botó reconegut
    IrReceiver.resume();
    
  Serial.print("CODI REBUT: ");
	Serial.println(result);

  }
  return result;
}
int mapCodeToButton(unsigned long code) { 
    code >>= 16; 
    if (((code >> 8) ^ (code & 0x00FF)) == 0x00FF) {
      return code & 0xFF; 
    } 	
  return -1; 
}

void temp() {
  temperatura = llegirTemperatura();
  //Serial.print("Temperatura ambient: ");
  //Serial.print(temperatura);
  //Serial.println(" Grau Celsius");
}
      
float llegirTemperatura() {
  static unsigned long tempsTempAnterior = 0;
  unsigned long tempsTempActual = millis();
  if (tempsTempActual - tempsTempAnterior >= 1000) {
    tempsTempAnterior = tempsTempActual;
    int lectura = analogRead(pinTemp);
    float voltatge = lectura * (5.0 / 1024.0);
    
    #ifdef SENSOR_LM35_fisic
      temperatura = voltatge * 100.0;
    #else
      temperatura = (voltatge - 0.5) * 100.0;
    #endif

    Serial.print("$Temp:");
    Serial.println(temperatura, 1);
  }
  return temperatura;
}


// Valor potenciometre és l'aigua gastada instantaniament a l'habitacle.
void llegirCabal() {
  static unsigned long tempsCabalAnterior = 0;
  unsigned long tempsCabalActual = millis();
  if (tempsCabalActual - tempsCabalAnterior >= 1000) {
    tempsCabalAnterior = tempsCabalActual;
    if (posicioAixeta == 90)cabal = analogRead(pinCabal); // valor entre 0 i 1023
    else cabal = 0;
    Serial.print("$valor_Cabal_1023:");
    Serial.println(cabal, 1);
  }
}

// A traves del valor del cabdal calculem els litres consumits.
/* EXEMPLE (25L MAX cabdal)
meitat del potenciometre: 512 × (25.0 / 1023) = 12.5 L/min
total acomulat per segon: 12.5 / 60 = 0.208 L

Aixeta lavabo mitjana	6.0 L/min	245
Dutxa normal 			12.0 L/min	491
Rentavaixelles 			10.0 L/min	409
*/
void calcularLitres() {
  static unsigned long tempsLitresAnterior = 0;
  unsigned long tempsLitresActual = millis();
  if (tempsLitresActual - tempsLitresAnterior >= 1000) {
    tempsLitresAnterior = tempsLitresActual;

    llegirCabal(); // omple la variable global cabal
    float cabalLmin = cabal * (25.0 / 1023.0);
    litres += cabalLmin / 60.0;
    Serial.print("$Litres:");
    Serial.println(litres, 2);
  }
}

/* Per mostrar la info a la pantalla led, amb botons, USAR FLIPPER en fisic.
1: litres acomulats
2: cabal instantani
3: estat de la clau d'aigua
4: temperatura
Play/Pause: Rotació pantalles
*/
void mostrarLitresAcumulats() {
  static unsigned long tempsAcomulatAnterior = 0;
  unsigned long tempsAcomulatActual = millis();
  
  if (tempsAcomulatActual - tempsAcomulatAnterior >= 1000) {
    tempsAcomulatAnterior = tempsAcomulatActual;

    //lcd.clear(); // no ho posem pq ho fem al loop
    lcd.setCursor(0, 0);
    lcd.print("Litres totals:");
    lcd.setCursor(0, 1);
    lcd.print(litres, 2);
  }
}

void mostrarCabalInstantani() {
  static unsigned long tempsInstantAnterior = 0;
  unsigned long tempsInstantActual = millis();
  
  if (tempsInstantActual - tempsInstantAnterior >= 1000) {
    tempsInstantAnterior = tempsInstantActual;

    llegirCabal(); // llegeix el potenciòmetre
    float cabalLmin = cabal * (25.0 / 1023.0); // converteix a L/min

    Serial.print("$Cabal_Instantani:");
    Serial.println(cabalLmin, 2);

    lcd.setCursor(0, 0);
    lcd.print("Cabal inst L/min:");
    lcd.setCursor(0, 1);
    lcd.print(cabalLmin, 1);
    //lcd.print(" L/min");
  }
}

void mostrarEstatClau() {
  static unsigned long tempsClauAnterior = 0; // static, només inicialitza primer cop
  unsigned long tempsClauActual = millis();
  
  if (tempsClauActual - tempsClauAnterior >= 1000) {
	tempsClauAnterior = tempsClauActual;
    lcd.setCursor(0, 0);
    lcd.print("Clau Pas d'Aigua");
    lcd.setCursor(0, 1);
    if (posicioAixeta > 0) lcd.print("OBERTA");
    else lcd.print("TANCADA");
  }
}

void mostrarTemperatura() {
  static unsigned long tempsMTAnterior = 0; // static, només inicialitza primer cop
  unsigned long tempsMTActual = millis();
  
  if (tempsMTActual - tempsMTAnterior >= 4000) {
	tempsMTAnterior = tempsMTActual;
    
    float mtemperatura = llegirTemperatura();
    
    lcd.setCursor(0, 0);
    lcd.print("Temperatura");
    lcd.setCursor(0, 1);
    lcd.print("Ambiental: ");
    lcd.print(mtemperatura, 1); // mostra 1 decimal
	  lcd.print(" C");
  }
}

void rotacioPantalles() {
  unsigned long tempsActual = millis();
  if (tempsActual - tempsPantallaAnterior >= 5000) { // cada 5 segons
    tempsPantallaAnterior = tempsActual;
    subpantalla++;
    if (subpantalla > 4) subpantalla = 1;
  }

  switch (subpantalla) {
    case 1: mostrarLitresAcumulats(); break;
    case 2: mostrarCabalInstantani(); break;
    case 3: mostrarEstatClau(); break;
    case 4: mostrarTemperatura(); break;
  }
}

void mostrarPantallaCanvi(int posicioAixeta) {
  digitalWrite(pinBacklight, HIGH);
  lcd.setCursor(0, 0);        
  lcd.print("Clau Pas d'Aigua");
  lcd.setCursor(0, 1);        
  if (posicioAixeta > 0) lcd.print("OBERTA");        
  else lcd.print("TANCADA");
}