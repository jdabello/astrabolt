import React from 'react';
import { Toast, ToastBody } from 'react-bootstrap';

export function Confirmation({ toggle }) {
    return (
        <Toast onClose={() => toggle(false)}>
            <Toast.Header>
                <strong className="mr-auto">Your product was added to the cart</strong>
                <small>Thank you!</small>
            </Toast.Header>
            <ToastBody>
                It will be shipped in the next 24 hours!
            </ToastBody>
        </Toast>
    )
}