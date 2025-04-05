import serial # type: ignore
import time
import requests  # Llibreria per fer peticions HTTP

PORT_ARDUINO = 'COM3'  # Canvia-ho pel teu port real
BAUD_RATE = 9600
API_URL = 'http://127.0.0.1:5000/dades'

def enviar_a_api(dada):
    try:
        response = requests.post(API_URL, json=dada)
        if response.status_code == 200:
            print("  ✅ Dada enviada correctament a l’API.")
        else:
            print("  ⚠️ Error enviant a l’API:", response.status_code)
    except Exception as e:
        print("  ❌ Error de connexió amb l’API:", e)

try:
    arduino = serial.Serial(PORT_ARDUINO, BAUD_RATE)
    print(f"[INFO] Connectat a {PORT_ARDUINO} correctament.")
except Exception as e:
    print("[ERROR] No s'ha pogut connectar amb l'Arduino:")
    print(e)
    exit()

time.sleep(2)

print("[INFO] Començant a llegir dades...\nPrem Ctrl+C per aturar.")

try:
    while True:
        if arduino.in_waiting > 0:
            linea = arduino.readline().decode('utf-8').strip()

            if linea.startswith("$"):
                # Dades útils
                print("[INFO] Dada útil:", linea)

                if linea.startswith("$Litres:"):
                    litresAcomulats = float(linea.split(":")[1]) # Litres acomulats
                    print(f"  ➤ 🚰 Litres consumits: {litresAcomulats:.2f}")
                    enviar_a_api({"litres": litresAcomulats})

                elif linea.startswith("$Temp:"):
                    temperatura = float(linea.split(":")[1]) # Temperatura ambiental
                    print(f"  ➤ 🌡️ Temperatura: {temperatura:.1f} ºC")
                    enviar_a_api({"temperatura": temperatura})
                
                elif linea.startswith("$Cabal_Instantani:"): # consum d'aigua instantani
                    cabalInstantani = float(linea.split(":")[1])
                    print(f"  ➤ 🚿 Cabal instantani: {cabalInstantani:.2f} L/min")
                    enviar_a_api({"cabalInstantani": cabalInstantani})

                elif linea.startswith("$Clau:"): # consum d'aigua instantani
                    posClau = int(linea.split(":")[1])
                    print(f"  ➤ 🔧 Posició de la clau de pas d'aigua: {posClau} graus")
                    enviar_a_api({"posicioClau": posClau})

                elif linea.startswith("$valor_Cabal_1023:"): # valor que passa per la canonada (potenciometre)
                    valorPotenciometre = int(float(linea.split(":")[1]))
                    print(f"  ➤ 📟 Valor potenciòmetre: {valorPotenciometre} sobre 0..1023")
                    enviar_a_api({"potenciometre": valorPotenciometre})

            else:
                # Missatges informatius (opcional mostrar-los)
                # print("[INFO] Missatge informatiu:", linea)
                pass  # Si no vols mostrar-los, només deixa aquesta línia

except KeyboardInterrupt:
    print("\n[INFO] Lectura aturada per l'usuari.")

arduino.close()
print("[INFO] Connexió tancada.")

# Per executar-ho, cmd a la carpeta, i --> 
# python llegir_dades_arduino_aigua.py

# SI NO ES CONNECTA CORRECTAMENT DESDE LA CMD, ES DEGUT A QUE L'ARDUINO ESTA USANT
# EL SERIAL MONITOR I EL PORT ES CORROMP. SI PERSISTEIX REINICIAR PC. 
# !!! SI el programa python esta corrents a la cmd, l'arduino no podrà pujar el programa