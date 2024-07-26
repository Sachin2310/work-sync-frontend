import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmailList } from "../redux/additionalStates";


const EmailTemplate = () => {

    const [emails, setEmails] = useState([]);
    const emailList = useSelector(state => state.additionalStates.emails);

    useEffect(() => {
        setEmails(emailList);
    }, [emailList]);


    return <>

        <div className="w-5/12 flex flex-col m-auto">
            <div className="mt-20 mb-16">
                {emails ?
                    emails.map(email => {
                        return <>

                            <div className="p-6 mt-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 font-normal text-gray-700 dark:text-gray-400">
                                <p><b>To:</b> {email.email}</p>
                                <div className="ml-8">
                                    <p ><b>Subject:</b> payment receipt</p>
                                    <br />
                                    <p >Dear {email.name},</p>
                                    <p >Your payment has been process with the below details,</p>
                                    <p >Vendor Name: {email.name}</p>
                                    <p >UPI id: {email.upi}</p>
                                    <p >Thank you for your continued partnership.</p>
                                    <br />
                                    <p >Best regards,</p>
                                    <p>Sachin</p>
                                    <p >Solution Architect</p>
                                    <p >Credmarg</p>
                                </div>

                            </div>

                        </>
                    }) : <p>No email found!</p>}
            </div>
        </div>

    </>


}

export default EmailTemplate;