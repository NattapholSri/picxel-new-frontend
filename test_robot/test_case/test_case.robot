# test specific Test_Cases 
# robot -t testcase1 mytestsuite.robot

# test whole Test
# robot mytestsuite.robot

*** Settings ***
Library    SeleniumLibrary
*** Variables ***
${url}=    http://localhost:8100/sign-in 
${browser}    chrome
${google}    https://google.com/ 
${sign_up}    http://localhost:8100/account-login
${regis_page}    http://localhost:8100/registration
${forgot_psw_page}    http://localhost:8100/forgot-password
${current_url} =  Execute Javascript  return window.location.href

*** Test Cases ***
test_practice
    I Am On Sign-In Page
    I fill in "Name-Surname" with my Name


#=======================
# Sign Up and Log In
#=======================

# Scenario: sign up
registeration
    I am on Regis page
    Sleep  0.5s
    I fill in email_box with reg_my_email
    Sleep  0.5s
    I fill in username_box with reg_my_username
    Sleep  0.5s
    I fill in password_box with reg_my_password
    Sleep  0.5s
    I fill in confirm_password_box with reg_my_confirm_password_box
    Sleep  0.5s
    I check in check_box
    Sleep  0.5s
    I click ลงทะเบียน
    Sleep  0.5s
    #after sign up complete page should redirect you to /account-login
    I should see login page

# scenario: ไม่ได้กรอกชื่อ
registeration_no_username
    I am on Regis page
    Sleep  0.5s
    I fill in email_box with reg_my_email
    Sleep  0.5s
    I fill in password_box with reg_my_password
    Sleep  0.5s
    I fill in confirm_password_box with reg_my_confirm_password_box
    Sleep  0.5s
    I check in check_box
    Sleep  0.5s
    I click ลงทะเบียน
    Sleep  1s
    I should see all info must be filled alert _message
    Sleep  0.5s
    I should see regis page

# scenario: ไม่ได้กรอก email
registeration_no_email
    I am on Regis page
    Sleep  0.5s
    I fill in username_box with reg_my_username
    Sleep  0.5s
    I fill in password_box with reg_my_password
    Sleep  0.5s
    I fill in confirm_password_box with reg_my_confirm_password_box
    Sleep  0.5s
    I check in check_box
    Sleep  0.5s
    I click ลงทะเบียน
    Sleep  1s
    I should see all info must be filled alert _message
    Sleep  0.5s
    I should see regis page

# scenario: ไม่ได้กรอก password
registeration_no_password
    I am on Regis page
    Sleep  0.5s
    I fill in email_box with reg_my_email
    Sleep  0.5s
    I fill in username_box with reg_my_username
    Sleep  0.5s
    I fill in confirm_password_box with reg_my_confirm_password_box
    Sleep  0.5s
    I check in check_box
    Sleep  0.5s
    I click ลงทะเบียน
    Sleep  0.5s
    Sleep  1s
    I should see all info must be filled alert _message
    Sleep  0.5s
    I should see regis page

# scenario: ไม่ได้กรอก confirm password
registeration_no_confirm_password
    I am on Regis page
    Sleep  0.5s
    I fill in email_box with reg_my_email
    Sleep  0.5s
    I fill in username_box with reg_my_username
    Sleep  0.5s
    I fill in password_box with reg_my_password
    Sleep  0.5s
    I check in check_box
    Sleep  0.5s
    I click ลงทะเบียน
    Sleep  0.5s
    Sleep  1s
    I should see all info must be filled alert _message
    Sleep  0.5s
    I should see regis page

# scenario: ไม่ได้ check in check box
registeration_no_check_box
    I am on Regis page
    Sleep  0.5s
    I fill in email_box with reg_my_email
    Sleep  0.5s
    I fill in username_box with reg_my_username
    Sleep  0.5s
    I fill in password_box with reg_my_password
    Sleep  0.5s
    I fill in confirm_password_box with reg_my_confirm_password_box
    Sleep  0.5s
    I click ลงทะเบียน
    Sleep  1s
    I should see all info must accept user policies
    Sleep  0.5s
    I should see regis page

# scenario: username ซ้ำ
registeration_username_already_taken
    I am on Regis page
    Sleep  0.5s
    I fill in email_box with reg_my_email
    Sleep  0.5s
    I fill in username_box with alreday_reg_my_username
    Sleep  0.5s
    I fill in password_box with reg_my_password
    Sleep  0.5s
    I fill in confirm_password_box with reg_my_confirm_password_box
    Sleep  0.5s
    I check in check_box
    Sleep  0.5s
    I click ลงทะเบียน
    Sleep  1s
    I should see username already taken alert message
    Sleep  0.5s
    I should see regis page

# scenario: email ซ้ำ
registeration_email_alreday_taken
    I am on Regis page
    Sleep  0.5s
    I fill in email_box with alreday_reg_my_email
    Sleep  0.5s
    I fill in username_box with reg_my_username
    Sleep  0.5s
    I fill in password_box with reg_my_password
    Sleep  0.5s
    I fill in confirm_password_box with reg_my_confirm_password_box
    Sleep  0.5s
    I check in check_box
    Sleep  0.5s
    I click ลงทะเบียน
    Sleep  1s
    I should see email already taken alert message
    Sleep  0.5s
    I should see regis page

# scenario: password does not match
registeration_password_does_not_match
    I am on Regis page
    Sleep  0.5s
    I fill in email_box with reg_my_email
    Sleep  0.5s
    I fill in username_box with reg_my_username
    Sleep  0.5s
    I fill in password_box with reg_my_password
    Sleep  0.5s
    I fill in confirm_password_box with unmatch_password_box
    Sleep  0.5s
    I check in check_box
    Sleep  0.5s
    I click ลงทะเบียน
    Sleep  1s
    I should see unmatch password alert message
    Sleep  0.5s
    I should see regis page
#----------END Feature: Sign Up--------------


#=======================
# Feature: Log In
#=======================

# Scenario: sign in
sign_in
    I am on Sign-In page

    Sleep  0.5s
    I fill in username_box with login_my_username

    Sleep  0.5s
    I fill in password_box with login_my_password

    Sleep  0.5s
    I click ลงชื่อเข้าใช้
    Sleep  0.5s
    # **check user profile page
    I should see account_detail page

## Sign In FALSE
# Scenario: wrong username
sign_in_wrong_username
    I am on Sign-In page

    Sleep  0.5s
    I fill in username_box with login_wrong_username

    Sleep  0.5s
    I fill in password_box with login_my_password

    Sleep  0.5s
    I click ลงชื่อเข้าใช้
    
    Sleep  1s
    I should see no user alert message
    #** Incorrect Info 
    Sleep  0.5s
    I should see login page

# Scenario: wrong password
sign_in_wrong_password
    I am on Sign-In page

    Sleep  0.5s
    I fill in username_box with login_my_username

    Sleep  0.5s
    I fill in password_box with login_wrong_password

    Sleep  0.5s
    I click ลงชื่อเข้าใช้

    Sleep  1s
    I should see wrong password alert message 
    # incorrect info
    Sleep  0.5s
    I should see login page

# Scenario: did not fill username
sign_in_no_username
    Sleep  0.5s
    I am on Sign-In page

    Sleep  0.5s
    I fill in password_box with login_my_password

    Sleep  0.5s
    I click ลงชื่อเข้าใช้

    Sleep  1s
    I should see please fill all info alert message 
    # login page assertion
    Sleep  0.5s
    I should see login page

# Scenario: did not fill password
sign_in_no_password
    Sleep  0.5s
    I am on Sign-In page

    Sleep  0.5s
    I fill in password_box with login_my_password

    Sleep  0.5s
    I click ลงชื่อเข้าใช้

    Sleep  1s
    I should see please fill all info alert message 
    # login page assertion
    Sleep  0.5s
    I should see login page
#----------END Feature: Sign In--------------





#=======================
# Feature: Guest Mode
#=======================
#----------END Feature: Guest Mode--------------


#=======================
# การดำเนินการเกี่ยวกับรหัสผ่าน
#=======================

# Feature: Change password 
## Scenario: Change Password
change_password
    # go to sign-in page
    I am on Sign-In page
    Sleep  0.5s
    # log in
    I fill in username_box with login_my_username
    Sleep  0.5s
    I fill in password_box with login_my_password
    Sleep  0.5s
    I click ลงชื่อเข้าใช้
    
    # change password step
    Sleep  0.5s
    I click setting 
    I click change password
    # Assertion Change Password Page
    I should see password changing page
    # I fill the new password and confirm password
    I fill in current password
    I fill in new password
    I fill in confirm new password
    I click confirm change password button
    I should see alert message รหัสผ่านของท่านถูกเปลี่ยนเรียบร้อย
    # Assertion after password changed web should redirect to sign-in page
    I should see login page

## Scenario: wrong current password
change_password_wrong_current_password
    # go to sign-in page
    I am on Sign-In page
    Sleep  0.5s
    # log in
    I fill in username_box with login_my_username
    Sleep  0.5s
    I fill in password_box with login_my_password
    Sleep  0.5s
    I click ลงชื่อเข้าใช้
    
    # change password step
    Sleep  0.5s
    I click setting 
    I click change password
    # Assertion Change Password Page
    I should see password changing page
    # I fill the new password and confirm password
    I fill in wrong_current password
    I fill in new password
    I fill in confirm new password
    I click confirm change password button
    # wrong current password
    I should see alert message รหัสผ่านไม่ถูกต้อง
    

## Scenario: new password is the same as current password
change_password_duplicate_password
    # go to sign-in page
    I am on Sign-In page
    Sleep  0.5s
    # log in
    I fill in username_box with login_my_username
    Sleep  0.5s
    I fill in password_box with login_my_password
    Sleep  0.5s
    I click ลงชื่อเข้าใช้
    
    # change password step
    Sleep  0.5s
    I click setting 
    I click change password
    # Assertion Change Password Page
    I should see password changing page
    # I fill the new password and confirm password
    I fill in current password
    I fill in current password in new password box
    I fill in current password in confirm password box 
    I click confirm change password button
    I should see alert message โปรดกรอกรหัสผ่านที่ไม่เคยใช้

## Scenario: new password and confirm new password unmatch
change_password_new_and_confirm_new_password_unmatch
    # go to sign-in page
    I am on Sign-In page
    Sleep  0.5s
    # log in
    I fill in username_box with login_my_username
    Sleep  0.5s
    I fill in password_box with login_my_password
    Sleep  0.5s
    I click ลงชื่อเข้าใช้
    
    # change password step
    Sleep  0.5s
    I click setting 
    I click change password
    # Assertion Change Password Page
    I should see password changing page
    # I fill the new password and confirm password
    I fill in current password
    I fill in new password
    I fill in confirm new password with unmatch password
    I click confirm change password button
    I should see alert message รหัสผ่านใหม่ไม่ตรงกัน

## Scenario: did not fill current password
change_password_unfill_current_password
    # go to sign-in page
    I am on Sign-In page
    Sleep  0.5s
    # log in
    I fill in username_box with login_my_username
    Sleep  0.5s
    I fill in password_box with login_my_password
    Sleep  0.5s
    I click ลงชื่อเข้าใช้
    
    # change password step
    Sleep  0.5s
    I click setting 
    I click change password
    # Assertion Change Password Page
    I should see password changing page
    # I fill the new password and confirm password
    I fill in new password
    I fill in confirm new password
    I click confirm change password button
    I should see alert message โปรดกรอกข้อมูลให้ครบ
    



#----------END การดำเนินการเกี่ยวกับรหัสผ่าน--------------
edit_profile 
    I am on Sign-In page

    Sleep  0.5s
    I fill in username_box with login_my_username

    Sleep  0.5s
    I fill in password_box with login_my_password

    Sleep  0.5s
    I click ลงชื่อเข้าใช้
    
    Sleep  0.5s
    I click edit_profile

    Sleep  0.5s
    I click gender
    Sleep  5s
    I want to change my gender to Male
    Sleep  2s
    I click ok to confirm my new gender

    Sleep  2s
    I type my new_first_name
    Sleep  2s
    I click บันทึกการแก้ไข
    # check if the changed has made 
    Sleep  0.5s
    I should see new profile info

cancel_profile_edition
    I am on Sign-In page

    Sleep  0.5s
    I fill in username_box with login_my_username

    Sleep  0.5s
    I fill in password_box with login_my_password

    Sleep  0.5s
    I click ลงชื่อเข้าใช้
    
    Sleep  0.5s
    I click edit_profile

    Sleep  0.5s
    I click gender
    Sleep  5s
    I want to change my gender to Male
    Sleep  2s
    I click ok to confirm my new gender

    Sleep  2s
    I type my new_first_name

    Sleep  2s
    I click cancel_button to cancel my edit
    # check if the changed has made 
    Sleep  0.5s
    I should see account_detail page

log_out
    I am on Sign-In page

    Sleep  0.5s
    I fill in username_box with login_my_username

    Sleep  0.5s
    I fill in password_box with login_my_password

    Sleep  2s
    I click ลงชื่อเข้าใช้
    Sleep  2s
    I click log_out_button 
    # check if the changed has made 
    Sleep  0.5s 
    I should see login page
*** Keywords ***

practice_test
    Open Browser    http://www.google.co.th    chrome

#=======================
# Feature: Log In
#=======================


I am on Sign-In page
    Open Browser    ${sign_up}    chrome

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
    Alert Should Be Present   ไม่พบ User ในระบบ

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
## test keyword check all elements of Login-Page in 1 keyword
I should see login page
    Element Should Contain    id=navbar    Welcome to PICXEL
    Element Should Contain    id=username_box    กรอกชื่อผู้ใช้
    Element Should Contain    id=password_box    กรอกรหัสผ่าน
    Element Should Contain    id=sign_in_button    ลงชื่อเข้าใช้
    Element Should Contain    id=no_account_question    ยังไม่มีบัญชี?
    Element Should Contain    id=register_button    REGISTER
    Element Should Contain    id=forgot_psw_question    ลืมรหัสผ่าน?
    Element Should Contain    id=reset_psw_button    RESET PASSWORD

# Regis-Page Assertion
## this keyword check all elements of Reg-Page in 1 keyword
I should see regis page
    Element Should Contain    id=navbar    Account registration
    Element Should Contain    id=email_box    กรอกอีเมลล์
    Element Should Contain    id=username_box    กรอกชื่อผู้ใช้
    Element Should Contain    id=password_box    กรอกรหัสผ่าน
    Element Should Contain    id=confirm_password_box    ยืนยันรหัสผ่าน
    Element Should Contain    id=user_policy_check_box    ฉันยอมรับและตกลงเงื่อนไขในการใช้บริการ
    Element Should Contain    id=register_button    ลงทะเบียน
    Element Should Contain    id=register_button    REGISTER

# Forgot-Password-Page Assertion
## this keyword check all elements of forgot_password page in 1 keyword
I should see forgot_password page
    Element Should Contain    id=navbar    Request password Reset
    Element Should Contain    id=email_box    กรอกอีเมลล์
    Element Should Contain    id=reset_password_button    ส่งคำขอ RESET PASSWORD

# account-detail Assertion
## this keyword check all elements of Reg-Page in 1 keyword
I should see account_detail page
    Element Should Contain    id=navbar    account-detail
    Element Should Contain    id=profile_picture    
    Element Should Contain    id=username_text    sompong 
    Element Should Contain    id=edit_profile_button    EDIT PROFILE 
    Element Should Contain    id=logout_button    LOGOUT 
    Element Should Contain    id=delete_this_account_button    DELETE THIS ACCOUNT 
    Element Should Contain    id=post_message    โพสต์ล่าสุดจากโปรไฟล์นี้ 
    Element Should Contain    id=load_more_post_button    โหลดโพสต์เพิ่มเติม 

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
    Open Browser    ${regis_page}    chrome
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

I should see all info must accept user policies
    Alert Should Be Present    คุณยังไม่ได้กดยอมรับข้อตกลงในการใช้งาน

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
I click edit_profile
    Click Element    xpath=/html/body/app-root/ion-app/ion-router-outlet/app-account-detail/ion-content/ion-grid/ion-row/ion-col[1]/ion-button

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

# Feature: unfill current password
I should see alert message โปรดกรอกข้อมูลให้ครบ
    Alert Should Be Present    โปรดกรอกข้อมูลให้ครบ
#---END PASSWORD OPERATION---#












### Old CPF CODE ###
I am on the Activity Base Home page
    open browser    ${url}    chrome

I should see Login Box
    Page Should Contain    เข้าสู่ระบบ
    Page Should Contain    เบอร์โทรศัพท์
    Page Should Contain Button    เข้าสู่ระบบ
    Page Should Contain Element   xpath=//*[@id="root"]/section/div/div/p[2]

I type manager phone number into number box and click
    Input Text    id=outlined-basic    0633438499
    Click Element    xpath=//*[@id="root"]/section/div/div/form/button

I type employee phone number into number box and click
    Input Text    id=outlined-basic    0123456789
    Click Element    xpath=//*[@id="root"]/section/div/div/form/button

    #กล่อง "กรอกรหัสยืนยัน"
    Page Should Contain Element   xpath=/html/body/div/section/div/div/p[1]
    #กล่อง บอก รหัสยืนยัน จะส่งไปที่ไหน
    Page Should Contain Element   xpath=/html/body/div/section/div/div/p[2]
    #กล่อง พิมพ์รหัสยืนยัน
    Page Should Contain Element   xpath=//*[@id="outlined-basic"]
    #กล่อง ครอบปุ่มกด ยืนยัน
    Page Should Contain Element   xpath=/html/body/div/section/div/div/form/button
    #ปุ่ม ยืนยัน
    Page Should Contain Element   xpath=/html/body/div/section/div/div/form/button/h6

I should see password employee confirmation page
    #กล่อง "กรอกรหัสยืนยัน"
    Page Should Contain Element   xpath=/html/body/div/section/div/div/p[1]
    #กล่อง บอก รหัสยืนยัน จะส่งไปที่ไหน
    Page Should Contain Element   xpath=/html/body/div/section/div/div/p[2]
    #กล่อง พิมพ์รหัสยืนยัน
    Page Should Contain Element   xpath=//*[@id="outlined-basic"]
    #กล่อง ครอบปุ่มกด ยืนยัน
    Page Should Contain Element   xpath=/html/body/div/section/div/div/form/button
    #ปุ่ม ยืนยัน
    Page Should Contain Element   xpath=/html/body/div/section/div/div/form/button/h6
#    Page Should Contain    กรอกรหัสยืนยัน
#    Page Should Contain    รหัสยืนยัน 6 หลักจะถูกส่งไปที่ เบอร์ 0983902707
#    Page Should Contain    รหัสยืนยัน
#    Page Should Contain Button    ยืนยัน
    
I type password and click submit
    Input Text    id=outlined-basic    123456
    Click Element    xpath=//*[@id="root"]/section/div/div/form/button


    
    
    
    
I should see the employe page NavBar
    Page Should Contain    CPF
    Page Should Contain    พาคิน เมทีชาญกิจ
    Page Should Contain    ออกจากระบบ

I should see calendar
    Page Should Contain    «
    Page Should Contain    ‹
    Page Should Contain Element    class:react-calendar  
    Page Should Contain Element    class:react-calendar__navigation__label
    Page Should Contain    ›
    Page Should Contain    »



I should see timecard
    Page Should Contain Element    class:timecard
    #time class detail
    Page Should Contain Element    class:mb-3
    Page Should Contain    สถานะ :
    Page Should Contain    ระยะเวลาทำงาน :
    Page Should Contain    ลงเวลางาน
    Page Should Contain    ติดต่อหัวหน้างาน
    Page Should Contain    เวลางานที่ได้รับมอบหมาย

I should see shifting table
    #Page Should Contain    DAY
    #Page Should Contain    xpath=//*[@id="root"]/section/div/section[2]/div/div/div[2]/div/div[2]/div/div[2]/div/div/div/div
    #Page Should Contain    xpath: //*[contains(text(), "example")]
    Page Should Contain Element    tag=table   
    Page Should Contain Element    tag=td    tabindex:0
    Page Should Contain    6:30 AM
    Page Should Contain Element    tag=table    class=MuiTable-root makeStyles-timeScaleContainer-41
# Manager Test

I should see the manager NavBar
    Page Should Contain    CPF
    Page Should Contain Element    tag=p    ณัฐกฤตย์ จตุภัทรดิษฐ์
    #Page Should Contain    ออกจากระบบ

I should see working table
    Page Should Contain    xpath=//*[@id="table"]
    Page Should Contain    xpath=//*[@id="root"]/section/div/div[1]/table
    
I should see add work button and click
    Page Should Contain    เพิ่มตารางงาน
    #click "เพิ่มตารางงาน" button
    Click Element    css:button.MuiButton-root:nth-child(1)
I insert all work info and submit
    #กรอก ชื่องาน
    Input Text    xpath=/html/body/div[2]/div[3]/div/div[2]/div[1]/div[1]/div/input    สับไก่เพิ่มเติม
    #กรอก เวลาเริ่มทำงาน
    Input Text    xpath=/html/body/div[2]/div[3]/div/div[2]/div[1]/div[3]/div[1]/div/input    10:00
    #กรอก เวลาเลิกงาน
    Input Text    xpath=/html/body/div[2]/div[3]/div/div[2]/div[1]/div[3]/div[2]/div/input    11:00
    #กรอก จำนวนกะ
    Input Text    xpath=/html/body/div[2]/div[3]/div/div[2]/div[1]/div[4]/div[1]/div/input    2
    #กรอก ชั่วโมงกะ
    Input Text    xpath=/html/body/div[2]/div[3]/div/div[2]/div[1]/div[4]/div[2]/div/input    20
    #click "ปฏิทิน (เริ่มงาน)"
    Click Element    css:html body div.MuiModal-root.css-79ws1d-MuiModal-root div.popup-container.left div.calendar-menu-container div.content div.content-left div.datetime-picker-wrapper.mb-5 div.MuiFormControl-root.css-r47a1p-MuiFormControl-root div.MuiOutlinedInput-root.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedEnd.css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root div.MuiInputAdornment-root.MuiInputAdornment-positionEnd.MuiInputAdornment-outlined.MuiInputAdornment-sizeMedium.css-1laqsz7-MuiInputAdornment-root div.react-datepicker-wrapper div.react-datepicker__input-container svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.color-navy.mr-2.css-i4bv87-MuiSvgIcon-root path
    #click "วันที่ (เริ่มทำงาน) "
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[1]/div[2]/div[1]/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[5]/div[3]
    #click "ปฏิทิน (วันสุดท้ายของงาน) "
    Click Element    css:html body div.MuiModal-root.css-79ws1d-MuiModal-root div.popup-container.left div.calendar-menu-container div.content div.content-left div.datetime-picker-wrapper.mb-5 div.MuiFormControl-root.css-r47a1p-MuiFormControl-root div.MuiOutlinedInput-root.MuiInputBase-root.MuiInputBase-colorPrimary.MuiInputBase-formControl.MuiInputBase-adornedEnd.css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root div.MuiInputAdornment-root.MuiInputAdornment-positionEnd.MuiInputAdornment-outlined.MuiInputAdornment-sizeMedium.css-1laqsz7-MuiInputAdornment-root div.react-datepicker-wrapper div.react-datepicker__input-container svg.MuiSvgIcon-root.MuiSvgIcon-fontSizeMedium.color-navy.mr-2.css-i4bv87-MuiSvgIcon-root path
    #click "วันที่ (วันสุดท้ายของงาน) "
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[1]/div[2]/div[1]/div/div/div[2]/div[2]/div/div/div[2]/div[2]/div[5]/div[3]
    #click "เพิ่มพนักงาน"
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[1]/button
    #click เพิ่มพนักงานคนแรก
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[2]/div/div/div/div/label[1]/span[1]/input
    #click บันทึก
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[1]/div[2]/div[2]/button

I should see uploadfile button and click
    #Click Element    xpath:/html/body/div/section/div/div[1]/div/div[2]/button[3]
    Choose File    xpath:/html/body/div/section/div/div[1]/div/div[2]/button[3]    D:\soft_eng_test\CPF\userlist_example.json

I should see edit work button
    Page Should Contain    จัดการตารางงาน    
    
I press add edit work button
    #กดปุ่มจัดการตารางงาน
    Click Element    xpath:/html/body/div/section/div/div[1]/div/div[2]/button[2]

      

I press add work button
    Click Element    css:button.MuiButton-root:nth-child(1)



I should see add work page details
    Page Should Contain    xpath=/html/body/div[2]/div[3]/div/div[2]/div[1]/p[1]
    Page Should Contain    xpath=/html/body/div[2]/div[3]/div/div[2]/div[1]/p[2]
    Page Should Contain    xpath=/html/body/div[2]/div[3]/div/div[2]/div[1]/button
    Page Should Contain    xpath=/html/body/div[2]/div[3]/div/div[1]/div[2]/div[2]/button



I should see New table
    Page Should Contain    xpath=//*[@id="table"]
    Click Element    xpath=//*[@id="table"]
    Page Should Contain    xpath=//*[@id="table"]/option[17]


I should edit work details
    #เห็นชื่องาน
    Page Should Contain    ชื่องาน
    #กรอก ชื่องาน
    Input Text    xpath=/html/body/div[2]/div[3]/div/div[2]/div[1]/div[1]/div/input    [แก้ไข]สับไก่
    #กรอก ชั่วโมงโอที
    #click "ปฏิทิน (เริ่มงาน)"
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[1]/div[2]/div[1]/div/button[2]
    #Sleep  2s
    #click "วันที่ (เริ่มทำงาน) "
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[1]/div[2]/div[1]/span[1]/div/div/div[2]/div/div/div/div[2]/button[18]
    #click "ปฏิทิน (วันสุดท้ายของงาน) "
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[1]/div[2]/div[2]/div/button[2]
    #click "วันที่ (วันสุดท้ายของงาน) "
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[1]/div[2]/div[2]/span[1]/div/div/div[2]/div/div/div/div[2]/button[28]
    #click เลือกพนักงานทุกคน
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[1]/div[4]/label[1]/span[1]/input
    #กรอกช่อง ชั่วโมงโอที
    Input Text    xpath=/html/body/div[2]/div[3]/div/div[2]/div[1]/div[5]/div/div/input    10
    #คลิกปุ่มจัดการพนักงาน
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[1]/button
    Sleep  2s
    #คลิกลบพนักงานคนแรก
    Click Element    css=html body div.MuiModal-root.css-79ws1d-MuiModal-root div.popup-container.left div.calendar-menu-container div.content div.MuiCollapse-root.MuiCollapse-horizontal.MuiCollapse-entered.css-1d98dbz-MuiCollapse-root div.MuiCollapse-wrapper.MuiCollapse-horizontal.css-18w3a48-MuiCollapse-wrapper div.MuiCollapse-wrapperInner.MuiCollapse-horizontal.css-14vyde3-MuiCollapse-wrapperInner div.content-right div.MuiFormGroup-root.mb-5.css-dmmspl-MuiFormGroup-root label.MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd.border.css-j204z7-MuiFormControlLabel-root svg.MuiSvgIcon-root.MuiSvgIcon-colorError.MuiSvgIcon-fontSizeMedium.p-3.css-1wxstni-MuiSvgIcon-root


I should edit work details individual
    #เห็นชื่องาน
    Page Should Contain    ชื่องาน
    #กรอก ชื่องาน
    Input Text    xpath=/html/body/div[2]/div[3]/div/div[2]/div[1]/div[1]/div/input    [แก้ไข]สับไก่
    #กรอก ชั่วโมงโอที
    #click "ปฏิทิน (เริ่มงาน)"
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[1]/div[2]/div[1]/div/button[2]
    #Sleep  2s
    #click "วันที่ (เริ่มทำงาน) "
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[1]/div[2]/div[1]/span[1]/div/div/div[2]/div/div/div/div[2]/button[18]
    #click "ปฏิทิน (วันสุดท้ายของงาน) "
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[1]/div[2]/div[2]/div/button[2]
    #click "วันที่ (วันสุดท้ายของงาน) "
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[1]/div[2]/div[2]/span[1]/div/div/div[2]/div/div/div/div[2]/button[28]
    #click เลือกพนักงาน "บางคน"
    Click Element    xpath:/html/body/div[2]/div[3]/div/div[2]/div[1]/div[4]/label[2]/span[1]/input
    #กรอกช่อง ชั่วโมงโอที
    Input Text    xpath=/html/body/div[2]/div[3]/div/div[2]/div[1]/div[5]/div/div/input    10
    Sleep  2s
    #click เลือกพนักงานที่ชอบ 
    Click Element    css=html body div.MuiModal-root.css-79ws1d-MuiModal-root div.popup-container.left div.calendar-menu-container div.content div.MuiCollapse-root.MuiCollapse-horizontal.MuiCollapse-entered.css-1d98dbz-MuiCollapse-root div.MuiCollapse-wrapper.MuiCollapse-horizontal.css-18w3a48-MuiCollapse-wrapper div.MuiCollapse-wrapperInner.MuiCollapse-horizontal.css-14vyde3-MuiCollapse-wrapperInner div.content-right div.MuiFormGroup-root.css-dmmspl-MuiFormGroup-root label.MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd.border.css-j204z7-MuiFormControlLabel-root span.MuiCheckbox-root.MuiCheckbox-colorPrimary.MuiButtonBase-root.PrivateSwitchBase-root.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root
    Click Element    css=html body div.MuiModal-root.css-79ws1d-MuiModal-root div.popup-container.left div.calendar-menu-container div.content div.MuiCollapse-root.MuiCollapse-horizontal.MuiCollapse-entered.css-1d98dbz-MuiCollapse-root div.MuiCollapse-wrapper.MuiCollapse-horizontal.css-18w3a48-MuiCollapse-wrapper div.MuiCollapse-wrapperInner.MuiCollapse-horizontal.css-14vyde3-MuiCollapse-wrapperInner div.content-right div.MuiFormGroup-root.css-dmmspl-MuiFormGroup-root label.MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd.border.css-j204z7-MuiFormControlLabel-root span.MuiCheckbox-root.MuiCheckbox-colorPrimary.MuiButtonBase-root.PrivateSwitchBase-root.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root
     #Click Element    css=html body div.MuiModal-root.css-79ws1d-MuiModal-root div.popup-container.left div.calendar-menu-container div.content div.MuiCollapse-root.MuiCollapse-horizontal.MuiCollapse-entered.css-1d98dbz-MuiCollapse-root div.MuiCollapse-wrapper.MuiCollapse-horizontal.css-18w3a48-MuiCollapse-wrapper div.MuiCollapse-wrapperInner.MuiCollapse-horizontal.css-14vyde3-MuiCollapse-wrapperInner div.content-right div.MuiFormGroup-root.css-dmmspl-MuiFormGroup-root label.MuiFormControlLabel-root.MuiFormControlLabel-labelPlacementEnd.border.css-j204z7-MuiFormControlLabel-root
    