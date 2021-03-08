import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { signIn } from '../../redux/actionCreators/userAction';

export default function Register() {
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();
  const dispatch = useDispatch();
  const dataBase = firebase.database();
  const onSubmit = async (data) => {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);
      const a = data.lastname + ' ' + data.firstname;
      const newUser = {
        uid: user.user.uid,
        name: a,
        email: data.email,
        rating: 0,
        money: 0,
        invite: '',
        work: '',
        avatar: '',
      };
    console.log('register===>', newUser);
      console.log('register===>', user);
    
    await dataBase.ref('users/' + user.user.uid).set(newUser);
    dispatch(signIn(newUser));
    history.push('/');
  };

  const onError = (errorss, e) => console.log(errorss, e);

  return (
    <form
      className="form_auth_register"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <h2 className="auth_title_register">Введите данные для регистрации</h2>
      <div className="form_auth_input_div">
        <input
          type="text"
          className="form_auth_input"
          placeholder="First name"
          name="firstname"
          ref={register({ required: true, maxLength: 80 })}
        />
        <input
          type="text"
          className="form_auth_input"
          placeholder="Last name"
          name="lastname"
          ref={register({ required: true, maxLength: 100 })}
        />
        <input
          type="email"
          className="form_auth_input"
          placeholder="Email"
          name="email"
          ref={register({ required: true, pattern: /^\S+@\S+$/i })}
        />
        <input
          type="tel"
          className="form_auth_input"
          placeholder="Mobile number"
          name="Mobile number"
          ref={register({ required: true, minLength: 6, maxLength: 12 })}
        />
        <input
          type="password"
          className="form_auth_input"
          placeholder="password"
          name="password"
          ref={register({ required: true, minLength: 6, maxLength: 12 })}
        />
        <select
          className="form_auth_select"
          name="Title"
          ref={register({ required: true })}
        >
          <option className="form_auth_select" value="male">
            муж
          </option>
          <option className="form_auth_select" value="female">
            женск
          </option>
        </select>
      </div>
      <p className="link_register">
        Есть аккаунт?
        <Link className="link_register link_register_active_register" to="/">
          Войди!
        </Link>
      </p>
      <button className="form_auth_action_btn_register_form" type="submit">
        Зарегестрироваться
      </button>
    </form>
  );
}
