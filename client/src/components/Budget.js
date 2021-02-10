import React, { Component } from 'react';
import Accounts from './Accounts';
import withContext from '../Context';
import Account from './Account';
import Form from 'react-bootstrap/Form';
import Delete from './Delete';

const DeleteWithContext = withContext(Delete);
const AccountsWithContext = withContext(Accounts);

export default class Budget extends Component {
    
    state = {
        accountList: ""
    }
    
    componentDidMount() {
        const { context } = this.props;

        context.data.getAccounts()
            .then( accounts => {
                this.setState( prevState => {
                    return {
                        accountList: accounts.accounts
                    }
                })
     }).catch((errors) => {
         console.log(errors);
    });
};

    render() {

        let results = this.state.accountList;
        let accountsObject = [];

        for (var i = 0; i < results.length; i++) {
            accountsObject[i] =

                <Account
                    accountName={results[i].accountName}
                    accountBalance={results[i].accountBalance}
                    key={i}
                />
        }

        let accountSum = 0;
        for (var i = 0; i < results.length; i++) {
            accountSum += results[i].accountBalance;
        }

       
 
        return (
            <React.Fragment>

                <div className="body">
                    <h2>Budget Overview</h2>
                    <Form>
                        {accountsObject}
                    </Form>
                   <h5>You have <u>${accountSum}</u> for expenses</h5>
                    <AccountsWithContext />
                    <DeleteWithContext accountList={this.state.accountList} />
                    
                </div>
                 

            </React.Fragment>
           
        )
    }

   
}

