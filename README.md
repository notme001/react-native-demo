## Prerequisites: 

1. Make sure npm is installed (https://www.npmjs.com/get-npm) 
2. Make sure CocoaPods dependency is installed (https://cocoapods.org/)

## Shared installation steps (iOS and Android) 

1. Git clone  
2. run ```npm install``` 
3. 


## run on iOS

1. run Xcode
2. choose "open existing Xcode project" 
3. in the window that opens select "projectFolder/ios" and click open 
4. Select the target to run project and click "run" 


## run on Android: 

1. run AndroidStudio 
2. choose "open existing Android Studio project" 
3. select "projectFolder/android" and click open 
4. Select the target to run project and click "run"

### Troubleshooting: 

Problem: iOS build fails with error ```"config.h" not found ```
Solution: 
	go to ```${project_dir}/node_modules/react-native/third-party/glog-0.3.4``` and open terminal window 
	run the following command: ```../../scripts/ios-configure-glog.sh``` 


