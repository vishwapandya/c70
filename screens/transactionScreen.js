import React from 'react';
import {Text,View,StyleSheet,TouchableOpacity, TextInput,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner'

export default class TransactionScreen extends React.Component{

    constructor(){
        super();
        this.state={
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
            scannedBookID: '',
            scannedStudentID: ''
        }
    }

    getCameraPermissions = async(id) =>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            /*status === 'granted' is true when user has granted permission 
            status === 'granted' is false when user has denied permission*/
            hasCameraPermissions: status === 'granted',
            buttonState: id,
            scanned: false
        })
    }
    
    handleBarCodeScanned = async({type,data})=>{
          const {buttonState} = this.state
        if(buttonState === "BookID"){
          this.setState({
            scanned: true,
            scannedBookID: data,
            buttonState: 'normal'
        })
        }
        else if(buttonState === "StudentID"){
          this.setState({
            scanned: true,
            scannedStudentID: data,
            buttonState: 'normal'
        })
        }
    }

    render(){
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState !== 'normal' && hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
                style = {StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState === 'normal'){
        return(
            <View style={styles.container}>
              <View>
                <Image
                  source = {require('../assets/booklogo.jpg')}
                  style = {{width: 200, height:200}}
                />
                <Text style={{textAlign:'center',fontSize:30,fontFamily:'comic sans ms'}}>WILLY</Text>
              </View>
               <View style={styles.inputview}>
                  <TextInput
                  style={styles.inputbox}
                  placeholder='Book Id'
                  value={this.state.scannedBookID}/>
                    <TouchableOpacity 
                    style={styles.scanButton}
                    onPress={()=>{
                      this.getCameraPermissions("BookID")
                    }} >
                      <Text style={styles.buttonText}>SCAN</Text>
                    </TouchableOpacity>
               </View>
               <View style={styles.inputview}>
                  <TextInput
                  style={styles.inputbox}
                  placeholder='Student Id'
                  value={this.state.scannedStudentID}/>
                    <TouchableOpacity 
                    style={styles.scanButton}
                    onPress={()=>{
                      this.getCameraPermissions("StudentID")
                    }} >
                      <Text style={styles.buttonText}>SCAN</Text>
                    </TouchableOpacity>
               </View>
               
            </View>
        )
        }
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    scanButton:{
        backgroundColor: '#66BB6A',
        borderWidth:1.5,
        width:100,
    },
    buttonText:{
        fontSize: 20,
        fontWeight: 'bold',
        textAlign:'center'
    },
    inputview:{
      flexDirection:'row',
      margin:20
    },
    inputbox:{
      width:200,
      height:40,
      borderWidth:1.5,
      fontSize:20,
    }
})
