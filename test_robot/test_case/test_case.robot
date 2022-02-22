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
*** Test Cases ***
test_practice
    practice_test
tc#1 Login to platform 
    
    I am on the Activity Base Home page
    I should see Login Box 
    I type manager phone number into number box and click
    # manager 0935461545, employee 0983902707, psw: 123456
    #I should see “Login or Register”
    #I press “Register”
    #I should see “Register”
    #I fill in “username” with “user1”
    #I fill in “password” with “password”
    #I fill in “confirm_password” with “password”
#robot -d result/tc1 -t "tc#1*" testcase/file.robot"

tc#3 Employee Log In   
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type employee phone number into number box and click
    #wait
    Sleep  2s
    #password login part
    I should see password employee confirmation page
    I type password and click submit



tc#5 Check Employee NavBar
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type employee phone number into number box and click
    #wait
    Sleep  2s
    #password login part
    I should see password employee confirmation page
    I type password and click submit
    # NabBar Part
    I should see the employe page NavBar

tc#7 Check Employee calendar&timecard
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type employee phone number into number box and click
    #wait
    Sleep  2s
    #password login part
    I should see password employee confirmation page
    I type password and click submit
    #Calendar Part
    I should see calendar
    #Timecard Part
    I should see timecard

tc#9 Check Employee shifting table
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type employee phone number into number box and click
    #wait
    Sleep  2s
    #password login part
    I should see password employee confirmation page
    I type password and click submit
    #shifting table part
    I should see shifting table

#Manager TEST
tc#2 Manager Log In
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type manager phone number into number box and click
    #wait
    Sleep  2s
    #password login part
    I should see password manager confirmation page
    I type password and click submit

tc#4 Check Manager NavBar
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type manager phone number into number box and click
    #wait
    Sleep  2s
    #password login part
    I should see password manager confirmation page
    I type password and click submit
    # NavBar Details
    I should see the manager NavBar 
    
tc#6 Manager can see add work button and add work table
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type manager phone number into number box and click
    #wait
    Sleep  1s
    #password login part
    I should see password manager confirmation page
    I type password and click submit
    Sleep  1s
    #press add work button
    I should see add work button and click
    I insert all work info and submit
    
tcupload upload employees database
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type manager phone number into number box and click
    #wait
    Sleep  1s
    #password login part
    I should see password manager confirmation page
    I type password and click submit
    Sleep  1s
    I should see uploadfile button and click
    
tc#8 Manager can edit work table

    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type manager phone number into number box and click
    #wait
    #Sleep  2s
    #password login part
    I should see password manager confirmation page
    I type password and click submit
    #Sleep  1s
    #See edit work button
    I should see edit work button
    #press edit work button
    I press add edit work button
    #edit work details
    #Sleep  2s
    I should edit work details

tc#11 Manager can edit work with individual employee
    #phone number part
    I am on the Activity Base Home page
    I should see Login Box 
    I type manager phone number into number box and click
    #wait
    #Sleep  2s
    #password login part
    I should see password manager confirmation page
    I type password and click submit
    #Sleep  1s
    #See edit work button
    I should see edit work button
    #press edit work button
    I press add edit work button
    #edit work details
    #Sleep  2s
    I should edit work details individual


    

    
    





*** Keywords ***

practice_test
    Open Browser    http://www.google.co.th    chrome

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

I should see password manager confirmation page
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
    