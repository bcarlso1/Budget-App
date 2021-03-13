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
          showAccountsState: false,
          showExpensesState: false,
          showDeleteAccountState: false,
          showDeleteExpenseState: false,
        };
        this.data = new Data();
    }

    

    render() {

        const value = {
              authenticatedUser: this.state.authenticatedUser,
              data: this.data,
              currentPassword: this.state.currentPassword,
              showAccountsState: this.state.showAccountsState,
              showExpensesState: this.state.showExpensesState,
              showDeleteAccountState: this.state.showDeleteAccountState,
              showDeleteExpenseState: this.state.showDeleteExpenseState,
              actions: {
              signIn: this.signIn,
              signOut: this.signOut,
              showAccounts: this.showAccounts,
              showExpenses: this.showExpenses,
              showDeleteAccount: this.showDeleteAccount,
              showDeleteExpense: this.showDeleteExpense
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

    showExpenses = () => {
      this.setState(prevState => ({ showExpensesState: !prevState.showExpenseState }))
    }

    showAccounts = () => {
      this.setState({ showAccountsState: true })
    }

    showDeleteAccount = () => {
      this.setState({ showDeleteAccountState: true })
    }

    showDeleteExpense = () => {
      this.setState({ showDeleteExpenseState: true })
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
