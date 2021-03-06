﻿function expandRomansFromTask() {
   
    if ($(UserAssignTaskId).val() && $(UserAssignTaskId).val() != "") {        
        sequenceScopePA.Task.TaskId = $(UserAssignTaskId).val();
        sequenceScopePA.Task.MainParentId = $(UserAssignTaskParentId).val();        
        sequenceScopePA.expandTask(parseInt($(UserAssignTaskId).val()));
    }
}


$(document).ready(function () {
    $('#def-intro').attr('src', $(DefIntrov).val());
    $('#def-intro')[0].load();

    expandRomansFromTask();
    // Send location id 1 - success popup
    sequenceScopePA.getFilesByDesignation(1, $(UserDesignationId).val());
    bindTreeEvents();
});

function bindTreeEvents() {
    $("body").off("click", ".tree-plus").on("click", ".tree-plus", function () {
        $(this).parent('li').find('.tree-child-files').fadeIn(100);
        $(this).hide();
        $(this).siblings('.tree-minus').show();
    });

    $("body").off("click", ".tree-minus").on("click", ".tree-minus", function () {
        $(this).parent('li').find('.tree-child-files').fadeOut(100);
        $(this).hide();
        $(this).siblings('.tree-plus').show();
    });
}
function AcceptTask() {    
    var returnval = true;
    if ($(txtPwd).val() && $(txtPwd).val() != "") {
        /*var postData;
        var MethodToCall;

        postData = {
            Password: $('#txtpassword').val()
        };

        MethodToCall = "AcceptInterviewTask";

        ShowAjaxLoader();

        CallJGWebService(MethodToCall, postData, OnAcceptTaskSuccess, OnAcceptTaskFail);

        function OnAcceptTaskSuccess(data) {
            if (data.d) {
                alert(data.d);
            }
            else {
                alert(data.d);
            }
            HideAjaxLoader();
        }

        function OnAcceptTaskFail(err) {
            HideAjaxLoader();
            alert('Can not proceed. Please try again.');
        }
        */
        returnval = true;
    }
    else {
        returnval = false;
        alert('Please enter password to change!');
        $(txtPwd).focus();
    }
    return returnval;
}

function TaskAcceptSuccessRedirect(HREF) {
    window.parent.location.href = HREF;
}

function expandRomansFromRoman(sender) {
    var appended = $(sender).attr('data-appended');
    var showMoreButton = false;
    var lastRow;
    if (appended == 'false') {
        $(sender).attr('src', "../img/btn-minus.png");
        //$(sender).parent().parent().parent().nextUntil('div.parent').removeClass('hide');
        $(sender).parent().parent().parent().nextUntil('div.parent').each(function (i, item) {
            if (i < 5)
                $(item).removeClass('hide');
            else if (i == 5) {
                showMoreButton = true;
                lastRow = item;
            }
            else {
                console.log(i);
            }
        });
        if (showMoreButton) {
            //Add View All button
            $(lastRow).prev().find('.roman-col-title-content').find('.ecBtn').remove();
            $(lastRow).prev().find('.roman-col-title-content').append('<div class="ecBtn" onClick="viewAllChild(this)" style="float: right;text-decoration: underline;background-color: brown;color: #fff;padding: 5px 8px 5px 8px;border-radius: 11px;cursor: pointer;">View All</div>');
        }
        $(sender).attr('data-appended', 'true');
        $('*[data-chosen="11"]').each(function (index) {
            var dropdown = $(this);
            $(dropdown).parent().find('.chosen-container').css('width', '200px');
        });
    }
    else {//collapse
        $(sender).attr('src', "../img/btn_maximize.png");
        $(sender).parent().parent().parent().nextUntil('div.parent').addClass('hide');
        $(sender).attr('data-appended', 'false');
    }

}

function makeProgress(sender, value) {
    var elem = document.getElementById(sender);
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= value) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}