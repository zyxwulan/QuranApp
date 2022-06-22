import {
  Image,
  ScrollView,
  StyleSheet,
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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

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
      <TextRegular type="Body 2" text={label} style={styles.textBlack} />
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
            style={styles.textRed}
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
      });
  };

  const validation = () => {
    if (confirmPassword !== password) {
      setWrongPassword(true);
    } else {
      handleRegister();
    }
  };

  GoogleSignin.configure({
    webClientId:
      '838254083000-mgqsul0igcjt9na1u9rp0nbrgrlfthuk.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
    scopes: [],
  });

  const signInWithGoogle = async () => {
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const user_sign_in = auth().signInWithCredential(googleCredential);

      user_sign_in
        .then(user => {
          const data = {
            uid: user.user.uid,
            name: user.user.displayName,
            email: user.user.email,
          };
          database()
            .ref('/users/' + user.user.uid + '/')
            .set(data);
          AsyncStorage.setItem('user', JSON.stringify(data));
          navigation.replace('Home');
        })
        .catch(error => {
          console.log('error', error);
        });
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <ScrollView>
      <View style={styles.page}>
        <View style={styles.cardContainer}>
          <Image source={Quran} style={styles.quranImage} />
          <Gap height={15} />
          <TextRegular type="2xl" text="Sign Up" style={styles.signupText} />
          <TextRegular
            type="Body 1"
            text="Please enter your details to sign up"
            style={styles.subtitle}
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
              style={styles.signupButton}
            />
          </View>
          <Gap height={16} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={signInWithGoogle}>
          <View style={styles.buttonOutline}>
            <Image source={Google} style={styles.googleImage} />
            <Gap width={8} />
            <TextRegular
              type="Body 1"
              text="Signup with Google"
              style={styles.signupText}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.question}>
          <TextRegular type="Caption" text="Already have an account? " />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Login')}>
            <TextRegular type="Caption" text="Login" style={styles.loginText} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  page: {
    paddingVertical: 50,
    backgroundColor: 'white',
    flex: 1,
  },
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
  cardContainer: {
    alignSelf: 'center',
  },
  quranImage: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  },
  signupText: {
    color: 'black',
    alignSelf: 'center',
  },
  subtitle: {
    color: 'black',
    alignSelf: 'center',
  },
  signupButton: {
    color: 'white',
    alignSelf: 'center',
  },
  googleImage: {
    width: 24,
    height: 24,
  },
  question: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
  },
  loginText: {
    color: '#1976D2',
  },
  textBlack: {
    color: 'black',
  },
  textRed: {
    color: 'red',
  },
});
