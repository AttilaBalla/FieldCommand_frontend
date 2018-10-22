/* This file contains all the text that the user sees in the form of
 * various info / warning / error messages
 *
 * */



export const messages = {
    acc_no_pw: "This account has no password currently.",
    acc_no_role: "This account does not have a role. You can set one now, or it will be automatically set to User upon activation.",
    acc_reset_success: "Account reset successful!",
    acc_cannot_activate: "Unable to activate the account. The key provided is invalid!",

    info_post_saved: "The post has been saved successfully!",
    info_post_deleted: "The post has been deleted successfully!",
    info_username: `Your username will be displayed to others and will be required when logging in.
            You may modify it here if you wish. Afterwards it can only be modified by admins.`,
    info_changes_saved: "Your changes have been saved successfully!",
    info_email_sent: "The email has been sent successfully!",
    info_email_sending: "Sending, Please wait...",

    err_field_required: "All fields are required!",
    err_post_short: "This post appears to be too short!",
    err_server_error: "A server error occured, please notify the owner!",
    err_session_expired: "Your session has expired, please log in again.",
    err_swr_api: "Unable to retrieve status. This might be due to Fieldcommand's backend or SWR.net's backend.",

};