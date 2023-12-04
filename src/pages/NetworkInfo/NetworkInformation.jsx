import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';


const NetworkInformation = ({ navigation }) => {
  const [ip, setIp] = useState('');
  const [ipv4, setIpv4] = useState('');
  const [broadcast, setBroadcast] = useState('');
  const [ssid, setSsid] = useState('');
  const [bssid, setBssid] = useState('');
  const [subnet, setSubnet] = useState('');
  const [defaultGateway, setDefaultGateway] = useState('');
  const [frequency, setFrequency] = useState('');


  const getIp = () => {
    // Get Local IP
    NetworkInfo.getIPAddress().then(ipAddress => {
      console.log('ip ' + ipAddress);
      setIp(ipAddress);
    });

    // Get IPv4 IP (priority: WiFi first, cellular second)
    NetworkInfo.getIPV4Address().then(ipv4Address => {
      console.log('ipv4 ' + ipv4Address);
      setIpv4(ipv4Address);
    });

    // Get Broadcast
    NetworkInfo.getBroadcast().then(broadcast => {
      console.log('broadcast ' + broadcast);
      setBroadcast(broadcast);
    });

    // Get SSID
    NetworkInfo.getSSID().then(ssid => {
      console.log('ssid ' + ssid);
      setSsid(ssid);
    });

    // Get BSSID
    NetworkInfo.getBSSID().then(bssid => {
      console.log('bssid ' + bssid);
      setBssid(bssid);
    });

    // Get Subnet
    NetworkInfo.getSubnet().then(subnet => {
      console.log('subnet ' + subnet);
      setSubnet(subnet);
    });

    // Get Default Gateway IP
    NetworkInfo.getGatewayIPAddress().then(defaultGateway => {
      console.log('defaultgateway ' + defaultGateway);
      setDefaultGateway(defaultGateway);
    });

    // Get frequency (supported only for Android)
    NetworkInfo.getFrequency().then(frequency => {
      console.log('frequency ' + frequency);
      setFrequency(frequency);
    });

  }


  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headingText}>DG Buzzer</Text>
      <View style={styles.btnContainer}>
 
        <TouchableOpacity
          style={styles.btn}
          onPress={getIp}>
          <Text style={styles.btntext} >Get Network Info</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>IP: {ip}</Text>
        <Text style={styles.text}>IPv4: {ipv4}</Text>
        <Text style={styles.text}>Broadcast: {broadcast}</Text>
        <Text style={styles.text}>SSID: {ssid}</Text>
        <Text style={styles.text}>BSSID: {bssid}</Text>
        <Text style={styles.text}>Subnet: {subnet}</Text>
        <Text style={styles.text}>Default Gateway: {defaultGateway}</Text>
        <Text style={styles.text}>Frequency: {frequency}</Text>
      </View>
    </View>
  );
};

styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  headingText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  btnContainer: {
    width: '70%',
    marginBottom: 20,
  },

  btn: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  btntext: {
    color: 'white',
  },
  textContainer: {
    width: '60%',
  },

  text: {
    color: 'black'
  }

});



export default NetworkInformation;
