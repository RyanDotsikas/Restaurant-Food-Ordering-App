/** ----- NPM PACKAGE IMPORTS -----**/
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart, faDollarSign, faUser, faBell} from "@fortawesome/free-solid-svg-icons";

/** ----- COMPONENT IMPORTS -----**/

/** ----- CSS/STYLING IMPORTS -----**/
import "../../resources/static/css/staff.css";

/**
 * This JS file contains all code related to the rendering of the 'Staff' perspective.
 *
 * Any components you wish to create related to this perspective should be developed within
 * this file.
 */

export class Staff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {selectedView: 'Staff'};
    }

    componentDidMount() {
        this.props.loadResourceFromServer('diningSessions', 10);
    }

    render() {
        return (
            <div className={"page staff-page"}>
                <StaffLanding history={this.props.history}
                              orders={this.props.orders}
                              onUpdate={this.props.onUpdate}
                              orderAttributes={this.props.orderAttributes}
                              diningSessions={this.props.diningSessions}
                              diningSessionsAttributes={this.props.diningSessionAttributes}
                              selectedView={this.props.selectedView}/>
            </div>
        )
    }
}

class StaffLanding extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickOrders = this.handleClickOrders.bind(this);
        this.handleClickRequests = this.handleClickRequests.bind(this);
    }

    // Method called when attempting to navigate to the 'Staff Requests' page
    handleClickRequests(e) {
        e.preventDefault();
        this.props.history.push({
            pathname: '/staff-requests',
            state: {onUpdate: this.props.onUpdate,
                    diningSessions: this.props.diningSessions,
                    diningSessionAttributes: this.props.diningSessionAttributes,
                    selectedView: this.props.selectedView}
        })
    }

    // Method called when attempting to navigate to the 'Staff Orders' page
    handleClickOrders(e) {
        e.preventDefault();
        this.props.history.push({
            pathname: '/staff-orders',
            state: {onUpdate: this.props.onUpdate,
                    orders: this.props.orders,
                    orderAttributes: this.props.orderAttributes,
                    selectedView: this.props.selectedView}
        })
    }

    render() {
        return (
            <div>
                <title>Staff Landing Page</title>
                <div id="staff-wrapper">
                    <header className="staff-frontpage">
                        <a href="#" className="staff-logo">
                            <img src="./img/logo.png" alt="Home"/>
                        </a>
                    </header>
                </div>
                <div className="staff-navigation">
                    <div className="staff-overlay">
                        <div className="staff-nav-btn-wrapper">
                            <button className="staff-nav-btn" onClick={this.handleClickRequests}>All Requests</button>
                        </div>
                        <div className="staff-nav-btn-wrapper">
                            <button className="staff-nav-btn" onClick={this.handleClickOrders}>All Orders</button>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}


/**
 * This component should contain the 'page' for the staff member to view all the current customer requests,
 * either bill or service requests.
 *
 * See 'Customer-Menu' component in Customer.js for an example of how to navigate to this page and connect it
 * to the Staff component above.
 */
export class StaffRequests extends React.Component {
    constructor(props) {
        super(props);
        this.handleAnswerServiceRequest = this.handleAnswerServiceRequest.bind(this);
    }


    //
    handleAnswerServiceRequest(tableNum, e) {
        // e.preventDefault();
        const updatedDiningSession = {};

        tableNum = 1;
        updatedDiningSession['tableNumber'] = tableNum;
        updatedDiningSession['serviceRequestStatus'] = 'INACTIVE';

        let oldDiningSession = this.props.location.state.diningSessions.find(function(session) {
            return session.entity.tableNumber === parseInt(tableNum, 10);
        });
        
        this.props.location.state.onUpdate(oldDiningSession, updatedDiningSession, 'diningSessions');
        this.props.history.push({
            pathname: '/staff-requests',
            //Any states that are defined in the constructor(props) above need to be passed in here
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleAnswerServiceRequest}>Asd</button>
            </div>
        );
    }
}


/**
 * This component should contain the 'page' for the staff member to view all the current orders,
 * generated by customers.
 */
export class StaffOrders extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeOrderStatus = this.handleChangeOrderStatus.bind(this);
    }

    handleChangeOrderStatus(diningSession, selectedOrderID, selectedStatus, e) {
        e.preventDefault();
        const updatedOrder = {};

        updatedOrder['dining_session_id'] = diningSession;
        updatedOrder['order_item_id'] = selectedOrderID;
        updatedOrder['status'] = selectedStatus;

        let oldOrder = this.props.orders.find(function(session) {
            return session.entity.orderID == parseInt(selectedOrderID, 10);
        });
        
        this.props.onUpdate(oldOrder, updatedOrder, 'orders');
        this.props.history.push({
            pathname: '/staff-orders',
        });
    }

    render() {
        return (
            <div>

            </div>
        );
    }

}