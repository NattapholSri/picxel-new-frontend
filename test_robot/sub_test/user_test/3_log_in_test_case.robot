# test specific Test_Cases 
# robot -t testcase1 mytestsuite.robot

# test whole Test
# robot mytestsuite.robot

*** Settings ***
Resource    0_user_keywords.robot

*** Test Cases ***

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
    [Teardown]    Close Browser

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
    I should see invalid input alert
    #** Incorrect Info 
    Sleep  0.5s
    I should see login page
    [Teardown]    Close Browser

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
    I should see invalid input alert
    # incorrect info
    Sleep  0.5s
    I should see login page
    [Teardown]    Close Browser

# Scenario: did not fill username
sign_in_no_username
    Sleep  0.5s
    I am on Sign-In page

    Sleep  0.5s
    I fill in password_box with login_my_password

    Sleep  0.5s
    I click ลงชื่อเข้าใช้

    Sleep  1s
    I should see invalid input username alert
    # login page assertion
    Sleep  0.5s
    I should see login page
    [Teardown]    Close Browser

# Scenario: did not fill password
sign_in_no_password
    Sleep  0.5s
    I am on Sign-In page

    Sleep  0.5s
    I fill in password_box with login_my_password

    Sleep  0.5s
    I click ลงชื่อเข้าใช้

    Sleep  1s
    I should see invalid input no password alert
    # login page assertion
    Sleep  0.5s
    I should see login page
    [Teardown]    Close Browser
#----------END Feature: Sign In--------------