# test specific Test_Cases 
# robot -t testcase1 mytestsuite.robot

# test whole Test
# robot mytestsuite.robot

*** Settings ***
Resource    0_user_keywords.robot

*** Test Cases ***
#=======================
# USER PROFILE EDITING 
#=======================

# Feature: Change profile picture
## Scenario: edit profile

sign_in
    I am on Sign-In page

    Sleep  0.5s
    I fill in username_box with login_my_username

    Sleep  0.5s
    I fill in password_box with login_my_password

    Sleep  0.5s
    I click ลงชื่อเข้าใช้
    
    Sleep  2s

edit_profile 
    
    I click top right menu
    Sleep  1s

    #Sleep  0.5s
    #I click gender
    #Sleep  5s
    #I want to change my gender to Male
    #Sleep  2s
    #I click ok to confirm my new gender
#
    #Sleep  2s
    #I type my new_first_name
    #Sleep  2s
    #I click บันทึกการแก้ไข
    ## check if the changed has made 
    #Sleep  0.5s
    #I should see new profile info
    I click edit profile
    Sleep  5s  
    I type new_username in firstname box
    Sleep  3s
    I click save my edition 
    Sleep  1s
    [Teardown]    Close Browser