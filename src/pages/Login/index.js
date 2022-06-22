import {
  Image,
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
        placeholder={placeholder}
        style={styles.textInput}
        onChangeText={onChangeText}
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

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        database()
          .ref(`users/${res.user.uid}/`)
          .once('value')
          .then(response => {
            AsyncStorage.setItem('user', JSON.stringify(response.val()));
            navigation.replace('Home');
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setEmailError(true);
        }

        if (error.code === 'auth/wrong-password') {
          console.log('The password is incorrect!');
          setPasswordError(true);
        }
      });
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
          database()
            .ref(`users/${user.user.uid}/`)
            .once('value')
            .then(response => {
              AsyncStorage.setItem('user', JSON.stringify(response.val()));
              navigation.replace('Home');
            });
          navigation.replace('Home');
        })
        .catch(error => {
          console.log('error', error);
        });
    } catch (error) {
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
    <View style={styles.page}>
      <View style={styles.header}>
        <Image source={Quran} style={styles.image} />
        <Gap height={15} />
        <TextRegular type="2xl" text="Welcome Back!" style={styles.textBlack} />
        <TextRegular
          type="Body 1"
          text="Please login to continue"
          style={styles.textLogin}
        />
      </View>
      <Gap height={46} />

      <RenderInput
        type="text"
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={value => {
          setEmail(value);
          setEmailError(false);
          setPasswordError(false);
        }}
        isError={emailError}
        textError="Email address is invalid!"
      />

      <RenderInput
        type="password"
        value={password}
        label="Password"
        placeholder="Enter your password"
        onChangeText={value => {
          setPassword(value);
          setEmailError(false);
          setPasswordError(false);
        }}
        isError={passwordError}
        textError="Wrong password!"
      />

      <TouchableOpacity activeOpacity={0.7} onPress={handleLogin}>
        <View style={styles.button}>
          <TextRegular type="Body 1" text="Login" style={styles.loginButton} />
        </View>
        <Gap height={16} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.7} onPress={signInWithGoogle}>
        <View style={styles.buttonOutline}>
          <Image source={Google} style={styles.imageGoogle} />
          <Gap width={8} />
          <TextRegular
            type="Body 1"
            text="Login with Google"
            style={styles.textBlack}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.signupButton}>
        <TextRegular type="Caption" text="Don't have an account? " />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Signup')}>
          <TextRegular
            type="Caption"
            text="Sign up"
            style={styles.textSignup}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: {
    paddingVertical: 50,
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    alignSelf: 'center',
  },
  image: {
    width: 70,
    height: 70,
    alignSelf: 'center',
  },
  textBlack: {
    color: 'black',
  },
  textLogin: {
    color: 'black',
    alignSelf: 'center',
  },
  loginButton: {
    color: 'white',
    alignSelf: 'center',
  },
  imageGoogle: {
    width: 24,
    height: 24,
  },
  signupButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
  },
  textSignup: {
    color: '#1976D2',
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
  textRed: {
    color: 'red',
  },
});
