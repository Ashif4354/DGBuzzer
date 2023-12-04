import socket

udp_socket = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
udp_socket.bind(('localhost', 10000))

while True:
    print('Waiting for data...\n')
    data, addr = udp_socket.recvfrom(1024)
    print(data.decode(), addr)