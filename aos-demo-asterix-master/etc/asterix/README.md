# Building Standalone Pumpkin

Using the latest image the following config needs to be done. 
1) Follow https://www.raspberrypi.org/documentation/configuration/wireless/access-point.md

2) AdminApp does not take nicely to the networking being re-configured, and need to be restarted. 
    - copy hotspot-config/lib/systemd/system/hotspot.service to pi:/etc/systemd/system/hotspot.service
    - copy hotspot-config/etc/pumpkin/service/adminapp/conf/restart.sh to pi:/etc/pumpkin/service/adminapp/conf/restart.sh
    - pi:> chmod 755 /etc/pumpkin/service/adminapp/conf/restart.sh
    - pi:> sudo systemctl daemon-reload
    - pi:> sudo systemctl service enable hotspot.service
    - pi:> sudo reboot

    testing 
    - pi:> sudo systemctl status hotspot.service
    - pi:> sudo systemctl restart hotspot.service

3) Setup software 
    - Bind "pir" and "door" sensors to hub ( sensei )
    - Check | modify /etc/pumpkin/service/adminapp/www/tests/demo.html to match the NodeId of the devices to the 
      code. The devices may not always match. This is tricky to fake.

4) Connect to Hub wifi HotSpot
    - Wifi name "mypi"
    - WiFi password "password"
    - Browse to http://192.168.4.1:3000/tests/demo.html
