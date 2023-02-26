import React,{useState} from "react"
import { 
    Text,
    TextInput,
    View, 
    TouchableOpacity,
    Vibration,
    Pressable,
    Keyboard
 } from "react-native"
import ResultImc from "./ResultImc/"
import styles from "./style"

export default function Form(props){

    const [height,setHeight] = useState(null)
    const [weight,setWeight] = useState(null)
    const [messageImc,setMessageImc] = useState("Preecha o peso e altura.")
    const [imc,setImc] = useState(null)
    const [TextButton,setTextButton] = useState("Calcular")
    const [errrorMessageAltura,setErrorMessageAltura] = useState(null)
    const [errrorMessagePeso,setErrorMessagePeso] = useState(null)

    function imcCalculator(){
        let heightFormat = height.replace(",",".")
        let weightFormat = weight.replace(",",".")
        return setImc((weightFormat/(heightFormat * heightFormat)).toFixed(2))
    }

    function validatorImc(){
        // validar input de peso
        if(weight === null){
            setErrorMessagePeso("Peso obrigatório!")
        }
        else{
            setErrorMessagePeso(null)
        }

        // validar input de altura
        if(height === null){
            setErrorMessageAltura("Altura obrigatório!")
        }
        else{
            setErrorMessageAltura(null)
        }

    }

    function validationImc(){
        if(weight !== null && height !== null){
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu IMC é igual: ")
            setTextButton("Calcular Novamente")
            setErrorMessagePeso(null)
            setErrorMessageAltura(null)
            Keyboard.dismiss()
            return
        }
        validatorImc()
        Vibration.vibrate()
        setImc(null)
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura")
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errrorMessageAltura}</Text>
                <TextInput
                style={styles.input}
                onChangeText={(newHeight) => setHeight(newHeight)}
                value={height}
                placeholder="Ex. 1.75" 
                keyboardType="numeric"
                />
                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errrorMessagePeso}</Text>
                <TextInput
                style={styles.input}
                onChangeText={(newWeight) => setWeight(newWeight)}
                value={weight}
                placeholder="Ex. 75.365" 
                keyboardType="numeric"
                />
                <TouchableOpacity
                 style={styles.buttonCalculator}
                 onPress={() => validationImc()}
                ><Text style={styles.textButtonCalculator}>{TextButton}</Text></TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
        </Pressable>
    )
}