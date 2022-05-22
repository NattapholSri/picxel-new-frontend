# test specific Test_Cases 
# robot -t testcase1 mytestsuite.robot

# test whole Test
# robot mytestsuite.robot

*** Settings ***
Resource    0_user_keywords.robot

*** Test Cases ***
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
    Sleep  1s
    I should see after signed up message 
    #after sign up complete page should redirect you to /account-login
    I should see after signed up login page
    [Teardown]    Close Browser

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
    [Teardown]    Close Browser
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
    [Teardown]    Close Browser
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
    [Teardown]    Close Browser
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
    [Teardown]    Close Browser
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
    [Teardown]    Close Browser
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
    [Teardown]    Close Browser
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
    [Teardown]    Close Browser
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
    [Teardown]    Close Browser
#----------END Feature: Sign Up--------------