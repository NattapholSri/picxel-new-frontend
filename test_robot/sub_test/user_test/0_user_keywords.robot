# test specific Test_Cases 
# robot -t testcase1 mytestsuite.robot

# test whole Test
# robot mytestsuite.robot

*** Settings ***
Library    SeleniumLibrary
*** Variables ***
${url}=    http://localhost:8100/sign-in 
#${browser}    chrome
${browser}    chrome
${google}    https://google.com/ 
${sign_up}    http://localhost:8100/account-login
${regis_page}    http://localhost:8100/registration
${forgot_psw_page}    http://localhost:8100/forgot-password
${current_url} =    Execute Javascript  return window.location.href
${server} =    http://localhost:8100
${DELAY} =    1

*** Keywords ***

practice_test
    Open Browser    http://www.google.co.th    ${browser}

#=======================
# Feature: Log In
#=======================


I am on Sign-In page
    Open Browser    ${sign_up}    ${browser}

I fill in username_box with login_my_username
    Input Text    name=ion-input-0    dummy

I fill in password_box with login_my_password
    Input Text    name=ion-input-1    dummy1234

I click ลงชื่อเข้าใช้
   Click Element    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-account-login/ion-content/div[2]/ion-button
   # Click Element    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-account-regis/ion-content/ion-button

# fill wrong username
I fill in username_box with login_wrong_username
    Input Text    name=ion-input-0    wrong_dummy

# Alert Message no user
I should see no user alert message
    Alert Should Be Present    เกิดข้อผิดพลาด โปรดตรวจสอบข้อมูลที่กรอก

# fill wrong password
I fill in password_box with login_wrong_password
    Input Text    name=ion-input-1    wrongpassword

# Alert Message wrong password
I should see wrong password alert message
    Alert Should Be Present   Incorrect Password

# Alert Message empty username
I should see please fill username alert message 
    Alert Should Be Present    Username must be filled

#---PAGE ASSERTION---#

# Login-Page Assertion
I should see invalid input username alert
    Alert Should Be Present    คุณยังกรอกข้อมูลไม่ครบ
I should see invalid input no password alert
    Alert Should Be Present    คุณยังกรอกข้อมูลไม่ครบ
I should see invalid input alert
    Alert Should Be Present    เกิดข้อผิดพลาด โปรดตรวจสอบข้อมูลที่กรอก
## test keyword check all elements of Login-Page in 1 keyword
I should see login page
    Element Should Contain    tag=ion-title    ยินดีต้อนรับสู่ PICXEL / Welcome to PICXEL
    #Element Should Contain    id=username_box    กรอกชื่อผู้ใช้
    #Element Should Contain    id=password_box    กรอกรหัสผ่าน
    #Element Should Contain    id=sign_in_button    ลงชื่อเข้าใช้
    #Element Should Contain    id=no_account_question    ยังไม่มีบัญชี?
    #Element Should Contain    id=register_button    REGISTER
    #Element Should Contain    id=forgot_psw_question    ลืมรหัสผ่าน?
    #Element Should Contain    id=reset_psw_button    RESET PASSWORD

# Regis-Page Assertion
## this keyword check all elements of Reg-Page in 1 keyword
I should see regis page
    Page Should Contain    กรอกชื่อผู้ใช้
    Page Should Contain    กรอกรหัสผ่าน
    Page Should Contain    ยืนยันรหัสผ่าน
    Page Should Contain    ฉันยอมรับและตกลงเงื่อนไขในการใช้บริการ
    Page Should Contain    ลงทะเบียน

# Forgot-Password-Page Assertion
## this keyword check all elements of forgot_password page in 1 keyword
I should see forgot_password page
    Element Should Contain    id=navbar    Request password Reset
    Element Should Contain    id=email_box    กรอกอีเมลล์
    Element Should Contain    id=reset_password_button    ส่งคำขอ RESET PASSWORD

# account-detail Assertion
## this keyword check all elements of Reg-Page in 1 keyword
I should see account_detail page
    Page Should Contain    PICXEL
    #Element Should Contain    id=navbar    account-detail
    #Element Should Contain    id=profile_picture    
    #Element Should Contain    id=username_text    sompong 
    #Element Should Contain    id=edit_profile_button    EDIT PROFILE 
    #Element Should Contain    id=logout_button    LOGOUT 
    #Element Should Contain    id=delete_this_account_button    DELETE THIS ACCOUNT 
    #Element Should Contain    id=post_message    โพสต์ล่าสุดจากโปรไฟล์นี้ 
    #Element Should Contain    id=load_more_post_button    โหลดโพสต์เพิ่มเติม 

# account-edit Assertion
## this keyword check all elements of Reg-Page in 1 keyword
I should see account_edit page
    Element Should Contain    id=navbar    account-edit
    Element Should Contain    id=gender    Gender    
    Element Should Contain    id=drop_down_select    Select One        
    Element Should Contain    id=picture_url    กรอก URL รูปภาพ
    Element Should Contain    id=firstname_text    Firstname 
    Element Should Contain    id=cancel_button    CANCEL 
    Element Should Contain    id=save_editted_button    บันทึกการแก้ไข 

# ASSERTION AFTER EXTRA INTERACTION

# Assertion after COMPLETE EDIT_PRFILE 
I should see new profile info
    Element Should Contain    id=navbar    account-detail
    Element Should Contain    id=profile_picture    
    Element Should Contain    id=username_text    sompong 
    Element Should Contain    id=edit_profile_button    EDIT PROFILE 
    Element Should Contain    id=logout_button    LOGOUT 
    Element Should Contain    id=delete_this_account_button    DELETE THIS ACCOUNT 
    Element Should Contain    id=post_message    โพสต์ล่าสุดจากโปรไฟล์นี้ 
    Element Should Contain    id=load_more_post_button    โหลดโพสต์เพิ่มเติม 

 # Assertion Change Password Page
I should see password changing page
    Element Should Contain    id=navbar    password changing
    Element Should Contain    id=current_password    current password
    Element Should Contain    id=new_password    new password
    Element Should Contain    id=confirm_new_password    confirm new password
    Element Should Contain    id=button_confirm_change_password    confirm
    


#---END PAGE ASSERTION---#

    
#=======================
# Feature Registeration 
#=======================

I am on Regis page
    Open Browser    ${regis_page}    ${browser}
I fill in email_box with reg_my_email
    Input Text    name=ion-input-0    wasawat_non1@gmail.com
I fill in username_box with reg_my_username
    Input Text    name=ion-input-1    wasawat_non1
I fill in password_box with reg_my_password
    Input Text    name=ion-input-2    0123456789
I fill in confirm_password_box with reg_my_confirm_password_box
    Input Text    name=ion-input-3    0123456789
I check in check_box
    Click Element    tag=ion-checkbox
I click ลงทะเบียน
    Click Element    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-account-regis/ion-content/ion-button
Then I should see "please check your email"_message 

I should see all info must be filled alert _message
    Alert Should Be Present    คุณยังกรอกข้อมูลไม่ครบ
    
I should see invalid password input alert _message
    Alert Should Be Present    รหัสผ่านกับรหัสในช่องยืนยันไม่ตรงกัน

I should see all info must accept user policies
    Alert Should Be Present    คุณยังไม่ได้กดยอมรับข้อตกลงในการใช้งาน

#after sign up log in page
I should see after signed up login page
    Element Should Contain    tag=ion-title    Account registration/การลงทะเบียนเข้าใช้งาน
I should see after signed up message
    Alert Should Be Present    ลงทะเบียนเสร็จสิ้น โปรดลงชื่อเข้าใช้งาน

# fill already reg username
I fill in username_box with alreday_reg_my_username
    Input Text    name=ion-input-1    wasawat_non1

# Alert Message of already reg uesrname
I should see username already taken alert message
    Alert Should Be Present    username is already taken

# fill already reg email
I fill in email_box with alreday_reg_my_email
    Input Text    name=ion-input-0    wasawat_non1@gmail.com

# Alert Message of already reg email
I should see email already taken alert message
    Alert Should Be Present    email is alreday taken

# fill un match password
I fill in confirm_password_box with unmatch_password_box
    Input Text    name=ion-input-3    unmatch_password_box

# Alert Message of unmatch password
I should see unmatch password alert message
    Alert Should Be Present    รหัสผ่านกับรหัสในช่องยืนยันไม่ตรงกัน

# Alert Message of empty username
I should see please fill all info alert message 
    Alert Should Be Present    คุณยังกรอกข้อมูลไม่ครบ




## Feature Edit User Profile

I click top right menu
    #Wait Until Element Contains    PICXEL
    Click Element At Coordinates    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-home/ion-content/ion-card[3]/app-post-create/ion-grid/ion-row[3]/ion-col/ion-button  811  -410 
    #Click Element    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-home/ion-content/ion-card[3]/app-post-create/ion-grid/ion-row[4]/ion-col[2]/ion-button
I click edit profile
    Click Element    xpath=/html/body/app-root/ion-app/ion-popover/app-pop-user-menu/ion-content/ion-list/ion-item[2]/ion-label

I type new_username in firstname box
    Input Text    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-account-edit/ion-content/ion-item[3]/ion-input/input  Christian

I click save my edition 
    Click Element    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-account-edit/ion-content/ion-button[2]
I click gender
    Click Element    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-account-edit/ion-content/ion-item[1]


I want to change my gender to Male
    Click Element    xpath=/html/body/app-root/ion-app/ion-alert/div[2]/div[3]/button[2]/div/div[2]
I click ok to confirm my new gender
    Click Element    xpath=//*[@id="ion-overlay-1"]/div[2]/div[4]/button[2]/span

I type my new_first_name
    Input Text    name=ion-input-3    dummychan
I click บันทึกการแก้ไข
    Click Element    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-account-edit/ion-content/ion-button[2]

I click cancel_button to cancel my edit
    Click Element    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-account-edit/ion-content/ion-button[1]

## Feature Log Out
I click log_out_button 
    Click Element    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-account-detail/ion-content/ion-grid/ion-row/ion-col[2]/ion-button
##
I fill in "Name-Surname" with my Name
    Input Text    name=ion-input-0    0633438499
    #Click Element    xpath=//*[@id="root"]/section/div/div/form/button


#=======================
# PASSWORD OPERATION
#=======================

# Feature: Password Changing 
I click setting 
    Click Element    id=setting    setting
I click change password
    Click Element    id=change_password    change password
I fill in current password
    Input Text    id=current_password_box    0123456789
I fill in new password
    Input Text    id=new_password_box    9876543210
I fill in confirm new password
    Input Text    id=confirm_new_password_box    9876543210
I click confirm change password button
    Click Element    id=change_password_button    confirm
I should see alert message
    Alert Should Be Present    รหัสผ่านของท่านถูกเปลี่ยนเรียบร้อย

# Feature: WRONG CURRENT PASSWORD
I should see alert message รหัสผ่านไม่ถูกต้อง
    Alert Should Be Present    รหัสผ่านไม่ถูกต้อง
I fill in wrong_current password
    Input Text    id=current_password_box    wrongpassword

# Feature: DUPLICATE PASSWORD
I fill in current password in new password box
    Input Text    id=new_password_box    0123456789
I fill in current password in confirm password box 
    Input Text    id=confirm_new_password_box    0123456789
I should see alert message โปรดกรอกรหัสผ่านที่ไม่เคยใช้
    Alert Should Be Present    โปรดกรอกรหัสผ่านที่ไม่เคยใช้
# Feature: new password and confirm new password does not match
I fill in confirm new password with unmatch password
    Input Text    id=confirm_new_password_box    unmatchpassword
I should see alert message รหัสผ่านใหม่ไม่ตรงกัน    
    Alert Should Be Present    รหัสผ่านใหม่ไม่ตรงกัน

# Feature: unfill:[current password, new password, confirm new password]
I should see alert message โปรดกรอกข้อมูลให้ครบ
    Alert Should Be Present    โปรดกรอกข้อมูลให้ครบ

# Feature: reset password
## Scenario: reset password
I click reset password button
    Click Element    id=reset_password_button    รีเซ็ทรหัสผ่าน
#I fill in email_box with reg_my_email
#   Input Text    id=email_box    wasawat_non1@gmail.com
I click request reset password
    Click Element    id=request_password_button    ส่งคำขอ RESET PASSWORD
I should see alert message your request has been sent to your email
    Alert Should Be Present    คำขอรีเซ็ทรหัสผ่านถูกส่งไปที่อีเมลล์ของท่านแล้ว

## Scenario: wrong email
I fill in email_box with wrong_my_email
    Input Text    id=email_box    wasawat_non1_wrong@gmail.com
I should see alert message incorrect info
    Alert Should Be Present    ข้อมูลไม่ถูกต้อง

## Scneario: new password duplicate

#---END PASSWORD OPERATION---#

#=======================
# Follow
#=======================
# try locate follow button
@try locate follow
    Click Element At Coordinates    tag=h5  911  208   
    
    #
    #'จำนวนผู้ติดตามบัญชีนี้: 0'
    #Page Should Contain     ดูรายละเอียดโพสต์ 
wait for follow button
    Wait Until Element Is Visible     follow  
I click follow him
    Click Element    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-account-detail[2]/ion-content/ion-card[2]/app-post-view/ion-list/ion-item/ion-grid/ion-row[1]/ion-col/ion-item/ion-buttons/ion-button
#---END Follow OPERATION---#
#=======================
# USER PROFILE EDITING
#=======================

## Scenario: CHANGE PROFILE PICTURE
# click profile picture to change profile picture
I click profile_picture 
    Click Element    id=user_profile_picture    
# choose local picture file
I choose my new profile picture
    Choose File    id=user_profile_picture    "this should be path"
# click confirm change button
I click confirm change button
    Click Element    id=confirm_button    confirm
# new profile picture assertion
##**** how to check the new image???
I should see my new profile picture
    Page Should Contain    id=user_profile_picture

## Scenario: Cancel the picture change
# click cancel button
I click cancel button
    Click Element    id=cancel_button

## Scenario: Change interest category
# click my interest button
I click my interest button  
    Click Element    id=my_interest_button
# click new category
I click new category
    Click Element    id=landscape

## Scenario: change category but CANCEL\
I click cancel button to cancel my category change
    Click Element    id=cancel_button

## Scenario: CHANGE BIO/DESCRIPTION
# CLICK BIO SETTING
I click bio setting button
    Click Element    id=bio_setting_button

# Fill in new bio
I fill in my new bio 
    Input Text    id=bio_box    "this is my NEW bio"

# CLICK CONFIRM BUTTON
I click confirm button
    Click Element    id=confirm_button

## Scenario: CANCEL BIO/DESCRIPTION EDIT
# CLICK CANCEL BIO/DESCRIPTION EDIT
    Click Element    id=cancel_button

# Feature: ADD PAYMENT METHOD
## Scenario: Add Payment Method Successful
# CLICK PAYMENT SETTING
I click payment setting 
    Click Element    id=payment_setting
# click add payment method
I click add payment method
    Click Element    id=add_payment_button
# fill card number
I fill card number
    Input Text    id=card_number_box    "cardnumber=012345689"
# fill cvv/ccv
I fill ccv
    Input Text    id=ccv_box    "ccv_text"
# FILL WRONG CCV
I fill wrong ccv
    Input Text    id=ccv_box    "WRONG_ccv_text"
# fill expired date
I fill expired date
    Input Text    id=exp_date_box   "22/03"
# click confirm
#I click confirm_button
#    Click Element   id=confirm_button

##Scenario: กรอกข้อมูลไม่ครบ
#ALERT MESSAGE of unfull fill info
I should see unfulled alert message 
    Alert Should Be Present    "please fill all info"
#Alert MESSAGE of FALSE info
I should see false info alert
    Alert Should Be Present    "incorrect info"
#---END USER PROFILE EDITING---#

#=======================
# search user
#=======================

I type username in the box
    Input Text    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-home/ion-content/ion-card[1]/app-smart-searchbox/ion-grid/ion-row/ion-col[1]/ion-searchbar/div/input    Saimon_Charles

I click username that I have search
    Click Element    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-home/ion-content/ion-card[1]/app-smart-searchbox/ion-grid/ion-row[2]/ion-list

I should see that user profile
    Pass Execution    pass
    