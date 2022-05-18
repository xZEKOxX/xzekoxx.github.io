function getContentBlocks() {
    return {
        "#Name" : {
            "type": "text",
            "source": "package>name"
        },
        "#Version" : {
            "type": "text",
            "source": "package>info>version"
        },
        "#description"	: {
            "type": "list",
            "source":"package>list>description",
            "paragraphElement": "<li class='info'>",
        },

        "#icon"	: {
            "type":"custom",
            "source" :"package>screenshots",
            "render" : function(element,source) {
                $.each(source, function(index,data) {
                    var th = $("<div>");
                    th.append($('<img class="image">')
                        .attr("src",id+'/screenshots/'+$(data).find('icon').text())
                    )
                    $(element).append(th);
                });
            }
        },

        "#screen"	: {
            "type":"custom",
            "source" :"package>screenshots>screen",
            "render" : function(element,source) {
                $.each(source, function(index,data) {
                    var th = $("<div class='screen'>");
                    th.append($('<img class="src">')
                        .attr("src",id+'/screenshots/'+$(data).find('image').text())
                    )
                    $(element).append(th);
                });
            }
        }
    }
}

function populateContentBlocks(data, blocks, error, success) {
    $.ajax({
        type    : "GET",
        dataType: "xml",
        url     : data,
        success : function(xml){
            data_loader_engine(blocks,xml);
            success(xml);
        },
        cache   : false,
        error: function(jqXHR, textStatus) {
            $("#Error").show();
            $(".all").hide();
            error(textStatus);
        }
    });
}