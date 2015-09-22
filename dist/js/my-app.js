var myApp = new Framework7();

var $$ = Dom7;


$$('form.ajax-submit').on('submitted', function (e) {
    e.preventDefault();
myApp.showPreloader();
    var searchKey=$$("#search-key").val();

    $$.get("path/of/api/"+searchKey,function(response){
            
        var brief='';
        var pPlan='';
        var currency;
        var pmtP='';
        var plan='';
        var sData=JSON.parse(response).success.data;
        var sid=sData[0].studentid;
        var dp=sData[0].profile_photo;

            $$.each(sData,function(k,v){
                brief+=' <li class="item-content">'+
                        '<div class="item-media"></div>'+
                            '<div class="item-inner">'+
                                '<div class="item-title">'+v.fname+'  '+v.mname+' '+v.lname+' ('+v.user_name+')</div>'+
                            '<div class="item-after">name</div>'+
                        '</div>'+
                    '</li>';
                brief+=' <li class="item-content">'+
                        '<div class="item-media"></div>'+
                            '<div class="item-inner">'+
                                '<div class="item-title">'+v.uni_approval_date+'</div>'+
                            '<div class="item-after">Enrollment Date</div>'+
                        '</div>'+
                    '</li>'; 
            brief+=' <li class="item-content">'+
                        '<div class="item-media"></div>'+
                            '<div class="item-inner">'+
                                '<div class="item-title">'+v.email_id+'</div>'+
                            '<div class="item-after">Email</div>'+
                        '</div>'+
                    '</li>'; 
            brief+=' <li class="item-content">'+
                        '<div class="item-media"></div>'+
                            '<div class="item-inner">'+
                                '<div class="item-title">'+v.phone_preffered+'</div>'+
                            '<div class="item-after">Phone</div>'+
                        '</div>'+
                    '</li>';
         brief+=' <li class="item-content">'+
                        '<div class="item-media"></div>'+
                            '<div class="item-inner">'+
                                '<div class="item-title">$500</div>'+
                            '<div class="item-after">Wallet</div>'+
                        '</div>'+
                    '</li>';

            });
            $$(".brief-data").html(brief);


     $$.get("path/of/api/"+sid,function(response){

            pmtP=JSON.parse(response).success;
            currency=pmtP.currency;
            plan=pmtP.paymentplan;
        var stat='';
            $$.each(plan,function(ke,va){
                if(va.status=='Y'){
                    stat='<span class="button button-fill color-green">'+va.dueAmount+'</span>';

                }
                else{
                      stat='<span class="button button-fill color-red">'+va.dueAmount+'</span>';
                }
                pPlan+='<li class="item-content">'+
                        '<div class="item-media">'+va.installmentNumber+'</div>'+
                        '<div class="item-inner">'+
                          '<div class="item-title">'+va.dueDate+'</div>'+
                          '<div class="item-after">'+stat+'</div>'+
                        '</div>'+
                   ' </li>';

            });
            $$(".payment-plan").html(pPlan);

            document.getElementById("photo-icon").src=dp; 
            myApp.hidePreloader(); 
     })
    });
});