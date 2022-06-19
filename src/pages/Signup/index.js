import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Quran, Google} from '../../assets';
import {TextRegular, Gap} from '../../components';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RenderInput = ({
  placeholder,
  label,
  type,
  value,
  onChangeText,
  isError,
  textError,
}) => {
  return (
    <View style={styles.formInput}>
      <TextRegular type="Body 2" text={label} style={{color: 'black'}} />
      <Gap height={3} />
      <TextInput
        type={type}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.textInput}
      />
      {isError ? (
        <>
          <Gap height={1} />
          <TextRegular
            type="Overline"
            text={textError}
            style={{color: 'red'}}
          />
          <Gap height={14} />
        </>
      ) : (
        <Gap height={28} />
      )}
    </View>
  );
};

const Signup = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const [textErrorEmail, setTextErrorEmail] = useState('');
  const [wrongPassword, setWrongPassword] = useState(false);

  const handleRegister = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        const data = {
          uid: res.user.uid,
          name: name,
          email: email,
        };

        database()
          .ref('/users/' + res.user.uid + '/')
          .set(data);
        AsyncStorage.setItem('user', JSON.stringify(data));
        navigation.replace('Home');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setTextErrorEmail('Email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          setTextErrorEmail('Email address is invalid!');
        }

        console.log(error.code);
      });
  };

  const validation = () => {
    if (confirmPassword !== password) {
      setWrongPassword(true);
    } else {
      handleRegister();
    }
  };

  return (
    <ScrollView>
      <View style={{paddingVertical: 50, backgroundColor: 'white', flex: 1}}>
        <View style={{alignSelf: 'center'}}>
          <Image
            source={Quran}
            style={{width: 70, height: 70, alignSelf: 'center'}}
          />
          <Gap height={15} />
          <TextRegular
            type="2xl"
            text="Sign Up"
            style={{color: 'black', alignSelf: 'center'}}
          />
          <TextRegular
            type="Body 1"
            text="Please enter your details to sign up"
            style={{color: 'black', alignSelf: 'center'}}
          />
        </View>
        <Gap height={46} />

        <RenderInput
          type="text"
          placeholder="Enter your name"
          label="Name"
          value={name}
          onChangeText={value => {
            setName(value);
            setTextErrorEmail('');
            setWrongPassword(false);
          }}
        />
        <RenderInput
          type="text"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={value => {
            setEmail(value);
            setTextErrorEmail('');
            setWrongPassword(false);
          }}
          isError={textErrorEmail}
          textError={textErrorEmail}
        />
        <RenderInput
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={value => {
            setPassword(value);
            setTextErrorEmail('');
            setWrongPassword(false);
          }}
        />
        <RenderInput
          type="password"
          label="Re-enter Password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChangeText={value => {
            setConfirmPassword(value);
            setTextErrorEmail('');
            setWrongPassword(false);
          }}
          isError={wrongPassword}
          textError="The password is incorrect!"
        />

        <TouchableOpacity activeOpacity={0.7} onPress={validation}>
          <View style={styles.button}>
            <TextRegular
              type="Body 1"
              text="Signup"
              style={{color: 'white', alignSelf: 'center'}}
            />
          </View>
          <Gap height={16} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7}>
          <View style={styles.buttonOutline}>
            <Image source={Google} style={{width: 24, height: 24}} />
            <Gap width={8} />
            <TextRegular
              type="Body 1"
              text="Signup with Google"
              style={{color: 'black'}}
            />
          </View>
        </TouchableOpacity>

        <View
          style={{flexDirection: 'row', alignSelf: 'center', marginTop: 30}}>
          <TextRegular type="Caption" text="Already have an account? " />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Login')}>
            <TextRegular
              type="Caption"
              text="Login"
              style={{color: '#1976D2'}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  formInput: {
    paddingHorizontal: 38,
  },
  textInput: {
    backgroundColor: '#C4C4C44D',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  button: {
    paddingVertical: 9,
    backgroundColor: '#DA8856',
    marginHorizontal: 38,
    borderRadius: 9,
    textAlign: 'center',
  },
  buttonOutline: {
    paddingVertical: 9,
    backgroundColor: '#fff',
    marginHorizontal: 38,
    borderRadius: 9,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#C4C4C44D',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
