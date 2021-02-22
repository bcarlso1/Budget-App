import React, { Component } from 'react';
import Data from '../Data';
import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {

    constructor() {
        super();
        this.state = {
          // courseList: [],
          authenticatedUser: Cookies.getJSON('authenticatedUser') || null,
          currentPassword: Cookies.getJSON('currentPassword') || null,
  
        };
        this.data = new Data();
    }

    render() {

        const value = {
              authenticatedUser: this.state.authenticatedUser,
              data: this.data,
              currentPassword: this.state.currentPassword,
              actions: {
              signIn: this.signIn,
              signOut: this.signOut
            }
        }

    

            return (    
                <Context.Provider value={value}>

                     {this.props.children}
                </Context.Provider>  
              );

    }

    signIn = async (emailAddress, password) => {
      const user = await this.data.getUser(emailAddress, password);
      if (user !== null) {
        this.setState(() => {
          return {
            authenticatedUser: user,
            currentPassword: password,
  
          };
        });
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        Cookies.set('currentPassword', JSON.stringify(password), { expires: 1 });
  
      }
      return user;
    }


    signOut = () => {
      this.setState({ authenticatedUser: null, currentPassword: null })
      Cookies.remove('authenticatedUser');
      Cookies.remove('currentPassword');
    }


}


export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

export const Consumer = Context.Consumer;
