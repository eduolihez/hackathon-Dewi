import serial.tools.list_ports

ports = list(serial.tools.list_ports.comports())
print("[INFO] Ports disponibles:\n")

for p in ports:
    print(f" - Port: {p.device}")
    print(f"   Descripció: {p.description}")
    print(f"   HWID: {p.hwid}\n")
