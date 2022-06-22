# test specific Test_Cases 
# robot -t testcase1 mytestsuite.robot

# test whole Test
# robot mytestsuite.robot

*** Settings ***
Resource    0_user_keywords.robot

*** Test Cases ***
#=======================
# Log In
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
    Set Selenium Speed    ${delay}
    #Sleep  0.5s
    # **check user profile page
    I should see account_detail page
    Sleep  2s

search_user
    Sleep  4s
    I type username in the box
    Sleep  2s
    I click username that I have search
    Set Selenium Speed    ${delay}
    #page assertion
    I should see that user profile
    Set Selenium Speed    ${delay}
    [Teardown]    Close Browser