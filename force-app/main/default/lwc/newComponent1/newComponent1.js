import { LightningElement } from 'lwc';

const columns = [
    { label: 'Resourse', fieldName: 'recourse' },
    { label: 'Amount', fieldName: 'amount', type: 'currency' },
    { label: 'Star Date', fieldName: 'starDate', type: 'date', editable:true },
    { label: 'End Date', fieldName: 'endDate', type: 'date', editable:true },
    { label: 'Email', fieldName: 'email', type: 'email' },
];

export default class NewComponent1 extends LightningElement {
    data = [];
    columns = columns;
    
};