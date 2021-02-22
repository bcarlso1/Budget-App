import React, { Component } from 'react';
import Accounts from './Accounts';
import withContext from '../Context';
import Account from './Account';
import Form from 'react-bootstrap/Form';
import Delete from './Delete';
import Expenses from './Expenses';
import Expense from './Expense';

const DeleteWithContext = withContext(Delete);
const AccountsWithContext = withContext(Accounts);
const ExpensesWithContext = withContext(Expenses);
const AccountWithContext = withContext(Account);  
const ExpenseWithContext = withContext(Expense); 

export default class Budget extends Component {
    
    state = {
        accountList: "",
        expenselizf: ""
    }
    
    componentDidMount() {
        const { context } = this.props;

        context.data.getAccounts()
            .then( accounts => {
                this.setState(
                     {
                        accountList: accounts.accounts
                    }
                )
            }).catch((errors) => {
                console.log(errors);
            });
        context.data.getExpenses()
                .then( expenses => {
                    this.setState(
                        {
                            expenseList: expenses.expenses
                        }
                    )
        }).catch((errors) => {
            console.log(errors);
        });

};

    render() {

        let results = this.state.accountList;
        
            let accountsObject = [];

            for (var i = 0; i < results.length; i++) {
                accountsObject[i] = 
                    <AccountWithContext
                        accountName={results[i].accountName}
                        accountBalance={results[i].accountBalance}
                        key={results[i].id}
                        id={results[i].id}
                    />
                
            }

            let expenseResults = this.state.expenseList;

            let accountSum = 0;
        
            let expensesObject = [];

            if (expenseResults != null) { // gives chance for expenseResults to load
                for (var i = 0; i < expenseResults.length; i++) {
                    expensesObject[i] = 
                        <ExpenseWithContext
                           expenseName={expenseResults[i].expenseName}
                           expenseCost={expenseResults[i].expenseCost}
                           key={expenseResults[i].id}
                           id={expenseResults[i].id}
                       />
                }
            
                for (var i = 0; i < expenseResults.length; i++) {
                    accountSum += expenseResults[i].expenseCost;
                }
                accountSum = accountSum * -1
                
            }

            for (var i = 0; i < results.length; i++) {
                accountSum += results[i].accountBalance;
            }

       
 
        return (
            <React.Fragment>

                <div className="body">
                    <h1>Budget Overview</h1>
                    <h3>Accounts</h3>
                    <Form>
                        {accountsObject}
                    </Form>
                    <h3>Expenses</h3>
                   <Form>
                         {expensesObject} 
                    </Form>
                    <div className="total">
                        <h5>You have ${accountSum} left for expenses</h5>
                    </div>
                    <AccountsWithContext />
                    <ExpensesWithContext />
                    <DeleteWithContext accountList={this.state.accountList} expenseList={this.state.expenseList} />
                    
                </div>
                 

            </React.Fragment>
           
        )
    }

   
}
