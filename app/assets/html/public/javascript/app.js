////////////////////////////////////////////////////////////
//////////////////////////COMMON////////////////////////////
////////////////////////////////////////////////////////////
var dataSource = {
	/*
	contacts : '../../datas/testDataset/contacts.json',
	smsThreads : '../../datas/testDataset/smsThreads.json',
	sms : '../../datas/testDataset/sms.json',
	files : '../../datas/testDataset/files.json',
	apps : ''../../datas/testDataset/apps.json'
	*/

    //contacts : 'datas/testDataset/contacts.json',
    //smsThreads : 'datas/testDataset/smsThreads.json',
	//sms : 'datas/testDataset/sms.json',
	/*files : 'datas/testDataset/files.json',
	apps : 'datas/testDataset/apps.json'
    */

    contacts : 'datas/addressBook/contacts.xhtml',
    smsThreads : 'datas/sms/threads.xhtml',
    //sms : 'datas/sms/show_thread.xhtml',
    files : 'datas/filemanagement/filemanager.xhtml',
    apps : 'datas/application/applications_list.xhtml',
    callLogs : 'datas/call/call_log.xhtml'
};
function getCharArray(){
	var charArray = [];
	for(var i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
		charArray.push(String.fromCharCode(i));
	}
	return charArray;
}
//jqAuto -- main binding (should contain additional options to pass to autocomplete)
//jqAutoSource -- the array to populate with choices (needs to be an observableArray)
//jqAutoQuery -- function to return choices
//jqAutoValue -- where to write the selected value
//jqAutoSourceLabel -- the property that should be displayed in the possible choices
//jqAutoSourceInputValue -- the property that should be displayed in the input box
//jqAutoSourceValue -- the property to use for the value
ko.bindingHandlers.jqAuto = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
        var options = valueAccessor() || {},
            allBindings = allBindingsAccessor(),
            unwrap = ko.utils.unwrapObservable,
            modelValue = allBindings.jqAutoValue,
            source = allBindings.jqAutoSource,
            query = allBindings.jqAutoQuery,
            valueProp = allBindings.jqAutoSourceValue,
            inputValueProp = allBindings.jqAutoSourceInputValue || valueProp,
            labelProp = allBindings.jqAutoSourceLabel || inputValueProp;

        //function that is shared by both select and change event handlers
        function writeValueToModel(valueToWrite) {
            if (ko.isWriteableObservable(modelValue)) {
				modelValue(valueToWrite );  
            } else {  //write to non-observable
				if (allBindings['_ko_property_writers'] && allBindings['_ko_property_writers']['jqAutoValue'])
					allBindings['_ko_property_writers']['jqAutoValue'](valueToWrite );    
            }
        }
        
        //on a selection write the proper value to the model
        options.select = function(event, ui) {
            writeValueToModel(ui.item ? ui.item.actualValue : null);
        };
            
        //on a change, make sure that it is a valid value or clear out the model value
        options.change = function(event, ui) {
            var currentValue = $(element).val();
            var matchingItem =  ko.utils.arrayFirst(unwrap(source), function(item) {
               return unwrap(inputValueProp ? item[inputValueProp] : item) === currentValue;   
            });
            if (!matchingItem) {
               writeValueToModel(null);
            }    
        }
        
        //hold the autocomplete current response
        var currentResponse = null;
            
        //handle the choices being updated in a DO, to decouple value updates from source (options) updates
        var mappedSource = ko.computed({
            read: function() {
                    mapped = ko.utils.arrayMap(unwrap(source), function(item) {
                        var result = {};
                        result.label = labelProp ? unwrap(item[labelProp]) : unwrap(item).toString();  //show in pop-up choices
                        result.value = inputValueProp ? unwrap(item[inputValueProp]) : unwrap(item).toString();  //show in input box
                        result.actualValue = valueProp ? unwrap(item[valueProp]) : item;  //store in model
                        return result;
                });
                return mapped;                
            },
            write: function(newValue) {
                source(newValue);  //update the source observableArray, so our mapped value (above) is correct
                if (currentResponse) {
                    currentResponse(mappedSource());
                }
            },
            disposeWhenNodeIsRemoved: element
        });
        
        if (query) {
            options.source = function(request, response) {  
                currentResponse = response;
                query.call(this, request.term, mappedSource);
            }
        } else {
            //whenever the items that make up the source are updated, make sure that autocomplete knows it
            mappedSource.subscribe(function(newValue) {
               $(element).autocomplete("option", "source", newValue); 
            });
            options.source = mappedSource();
        }
        
        //initialize autocomplete
        $(element).autocomplete(options);
    },
    update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
       //update value based on a model change
       var allBindings = allBindingsAccessor(),
           unwrap = ko.utils.unwrapObservable,
           modelValue = unwrap(allBindings.jqAutoValue) || '', 
           valueProp = allBindings.jqAutoSourceValue,
           inputValueProp = allBindings.jqAutoSourceInputValue || valueProp;
        
       //if we are writing a different property to the input than we are writing to the model, then locate the object
       if (valueProp && inputValueProp !== valueProp) {
           var source = unwrap(allBindings.jqAutoSource) || [];
           var modelValue = ko.utils.arrayFirst(source, function(item) {
                 return unwrap(item[valueProp]) === modelValue;
           }) || {};             
       } 

       //update the element with the value that should be shown in the input
       $(element).val(modelValue && inputValueProp !== valueProp ? unwrap(modelValue[inputValueProp]) : modelValue.toString());    
    }
};
ko.bindingHandlers.jqAutoCombo = {
    init: function(element, valueAccessor) {
		var autoEl = $("#" + valueAccessor());
       
        $(element).click(function() {
			// close if already visible
            if (autoEl.autocomplete("widget").is(":visible")) {
                console.log("close");
                autoEl.autocomplete( "close" );
                return;
            }
			//autoEl.blur();
            console.log("search");
            autoEl.autocomplete("search", " ");
            autoEl.focus(); 
        });
    }  
}
////////////////////////////////////////////////////////////
//////////////////////////CONTACTS//////////////////////////
////////////////////////////////////////////////////////////
function initContactsView(){
	var cvm = new ContactsViewModel();
	ko.applyBindings(cvm, document.getElementById('contactsView'));

	loadContacts(cvm, function(){
		$("#contactsList li").each(function(index, element) {
			var letter = $(this).children().children('span').text().charAt(0);
			if ($("#letter"+letter).length < 1) {
				$("#contactsList").append($('<li class="groupLetter"><span id="letter'+letter+'">'+letter+'</span><ul></ul></li>'));
			}
			$(this).appendTo($("#letter"+letter).next());
		});
		$("#shortcut-contact a").click(function(){
			var c = $(this).text();
			console.log($("#letter"+c));
			$('.sidebar').animate({
				scrollTop: $("#letter"+c).offset().top - $("#contactsList").offset().top
			}, 'slow');
		});
	});

    console.log("après loadcontact");
}
function loadContacts(viewModel, callback){
	$.getJSON(dataSource.contacts, function(datas) {
		viewModel.contacts.removeAll();
		for(key in datas){
			viewModel.addContact(datas[key]);
		}
		viewModel.sortContacts(datas[key]);
		
		if(typeof(callback) == "function")
			callback();
	}).fail(function (d, textStatus, error) {
        console.error("getJSON failed, status :" + textStatus + ", error : " + error);
    });
}
function searchContacts(searchTerm, sourceArray){
	$.getJSON(dataSource.contacts, function(datas) {
		var result = [];
		for(key in datas){
			if(datas[key].name.substring(0,searchTerm.length) == searchTerm)
				result.push(datas[key]);
		}
		sourceArray(result);
	});
}	
function Contact(n, i, p, e){
	var self = this;
	self.id;
	self.name = n;
	self.contactImg = "graphics/seeContactImg.xhtml?contactId=0" || i;
	//if( Object.prototype.toString.call( p ) === '[object Array]' )
	self.phones = [] || p;
	self.emails = [] || e;
}
function ContactsViewModel(){
	var self = this;
	
	self.modeEnum = {
		READ : 0,
		CREATE : 1
	};
	self.currentMode = ko.observable(self.modeEnum.READ);
	self.setAddContactMode = function(){
		self.selectedContact(new Contact());
		self.currentMode(self.modeEnum.CREATE);
	};
	
	self.selectedContact = ko.observable();
	self.shortcuts = ko.observableArray(['#'].concat(getCharArray()));
	self.contacts = ko.observableArray([]);
	self.addContact = function(obj){
		self.contacts.push(obj);
	};
	self.select = function(contact){
		self.selectedContact(contact);
		self.currentMode(self.modeEnum.READ);
	};
	self.getContact = function(index){
		var i = null;
		if(typeof(index) == "function")
			i = index.call();
		else
			i = parseInt(index);
		if(i != NaN && i > 0)
			return self.contacts()[i];
		console.log(index);
		console.log("L'index doit �tre un entier positif.");
		return null;
	};
	self.sortContacts = function(){
		self.contacts.sort(function(a,b) {
			if (a.name < b.name)
				return -1;
			if (a.name > b.name)
				return 1;
			return 0;
		});
	};
	
	self.submitContact = function(formElement){
		var name = $('#name').val();
		var phone = $('#phone').val();
		var email = $('#email').val();
		var address = $('#address').val();
	 
		if(name !== '' && phone !== '' && email !== '' && address !== '') {
			$.ajax({
				url: $(formElement).attr('action'),
				type: $(formElement).attr('method'),
				data: $(formElement).serialize(),
				dataType: 'json', // JSON
				success: function(json) {
					if(json.success) {
						console.log('contact ajout�');
					} else {
						console.log('echec de l\'ajout');
					}
				},
				error: function(json) {
					console.log('fail');
				}
			});
		}
	};
};
////////////////////////////////////////////////////////////
/////////////////////////////SMS////////////////////////////
////////////////////////////////////////////////////////////
function initSmsView(){
	var smsVM = new SmsViewModel();
	ko.applyBindings(smsVM, document.getElementById('smsView'));
	
	loadSms(smsVM);
}
function loadSms(viewModel, callback){
    console.log('avant getjson sms');
	$.getJSON(dataSource.smsThreads, function(datas) {
		viewModel.threads.removeAll();
		for(key in datas){
			viewModel.addThread(datas[key]);
		}
        viewModel.sortThreads(datas[key]);

		if(typeof(callback) == "function")
			callback();
	}).fail(function (d, textStatus, error) {
        console.error("getJSON SMS failed, status :" + textStatus + ", error : " + error);
    });
}
function SmsViewModel(){
	var self = this;
	
	self.modeEnum = {
		READ_THREAD : 0,
		NEW_SMS : 1
	};
	self.currentMode = ko.observable(self.modeEnum.READ_THREAD);
	self.setNewSmsMode = function(){
		self.currentMode(self.modeEnum.NEW_SMS);
	};
	
	self.contacts = ko.observableArray();
	
	self.selectedThread = ko.observable();
	self.threads = ko.observableArray([]);
	self.addThread = function(obj){
		self.threads.push(obj);
	};
	self.selectThread = function(thread){
		self.selectedThread(thread);
		$.getJSON(dataSource.sms + "?threadId=" + thread.id + "&contactId=" + thread.contactId , function(datas){
            datas[0]['addr']  = thread.addr;

            datas[0]['messages'].sort(function(a,b) {
                if (a.date > b.date)
                    return -1;
                if (a.date < b.date)
                    return 1;
                return 0;
            });

            self.currentChat(datas[0]);
            console.log(self.currentChat);
            self.sortSms(datas[0]);
		});
	};
    self.sortThreads = function(){
        self.threads.sort(function(a,b) {
            if (a.date > b.date)
                return -1;
            if (a.date < b.date)
                return 1;
            return 0;
        });
    };

	self.currentChat = ko.observable();
	self.sortSms = function() {

        console.log(self.currentChat.messages);
		self.currentChat.messages.sort(function(a,b) {
			if (a.timest > b.timest) {
                return -1;
            }
			if (a.timest < b.timest) {
                return 1;
            }
			return 0;
		});
	};
	
	self.submitSms = function(formElement){
		var smsText = $('#smsText').val();
	 
		if(smsText !== '') {
			$.ajax({
				url: $(formElement).attr('action'),
				type: $(formElement).attr('method'),
				data: $(formElement).serialize(),
				dataType: 'json', // JSON
				success: function(json) {
					if(json.success) {
						console.log('message envoyé');
					} else {
						console.log('echec de l\'envoie : ');
					}
				},
				error: function(json) {
					console.log('fail');
				}
			});
		}
	};
};
////////////////////////////////////////////////////////////
////////////////////////////FILES///////////////////////////
////////////////////////////////////////////////////////////
function initFilesView(){
	var filesVM = new FilesViewModel();
	ko.applyBindings(filesVM, document.getElementById('filesView'));
	
	loadFiles(filesVM);
}
function loadFiles(viewModel, callback){
	$.getJSON(dataSource.files, function(datas) {
		//viewModel.files.removeAll();
		for(key in datas){
			viewModel.addFile(datas[key]);
		}
		viewModel.sortFiles(datas[key]);
		
		if(typeof(callback) == "function")
			callback();
	});
}
function File(_filetype, _path, _name, _ext, _size, _modificationDate){
	var self = this;
	self.id;
	self.filetype = _filetype;
	self.extension = _ext;
	self.filename = _name;
	self.path = _path;
	self.size = _size;
	self.modified = _modificationDate;
}
function FilesViewModel(){
	var self = this;

	self.files = ko.observableArray([]);
	
	self.selectedFolder = ko.observable();
	self.addFile = function(obj){
		self.files.push(new File(obj.Filetype, obj.Path, obj.Filename, obj.Extension, obj.Size, obj.Modified));
	};
	self.selectFile = function(file){
		self.selectedFolder(file);
		$.getJSON(dataSource.sms, function(datas){
			for(key in datas){
				if(datas[key].threadId == file.id){
					console.log(datas[key]);
					self.currentChat(datas[key]);
				}
			}
		});
	};
	self.sortFileSystemItem = function(){
		self.files.sort(function(a,b) {
			if (a.date < b.date)
				return -1;
			if (a.date > b.date)
				return 1;
			return 0;
		});
	};
};
////////////////////////////////////////////////////////////
/////////////////////////////APP////////////////////////////
////////////////////////////////////////////////////////////
function initAppsView(){
	var appsVM = new AppsViewModel();
	ko.applyBindings(appsVM, document.getElementById('appsView'));
	
	loadApps(appsVM);
}
function loadApps(viewModel, callback){
	$.getJSON(dataSource.apps, function(datas) {
		viewModel.apps.removeAll();
		for(key in datas){
			viewModel.addApp(datas[key]);
		}
		viewModel.sortApps(datas[key]);
		
		if(typeof(callback) == "function")
			callback();
	});
}
function App(_name, _version, _installDate, _size, _icon, _location, _download){
	var self = this;
	self.id;
	self.name = _name;
	self.version = _version;
	self.installDate = _installDate;
	self.size = _size;
	self.icon = _icon;
	self.location = _location;
	self.download = _download;
}
function AppsViewModel(){
	var self = this;

    self.apps = ko.observableArray([]);

    self.selectedApp = ko.observable();
    self.addApp = function(obj){
        self.apps.push(new App(obj.name, obj.version, obj.installDate, obj.size, obj.icon, obj.location, obj.download));
    };
    self.download = function(obj){
        $.ajax({
            url: obj.download,
            success: function(json) {
                if(json.success) {
                    console.log('application téléchargé');
                } else {
                    console.log('echec du téléchargement');
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('status : '+textStatus);
                console.log('error : '+errorThrown);
            }
        });
    };
    self.selectApp = function(obj){
        if(obj.selected())
            obj.selected(false);
        else
            obj.selected(true);
        self.selectedApp(obj);
    };
    self.sortApps = function(){
        self.apps.sort(function(a,b) {
            if (a.name < b.name)
                return -1;
            if (a.name > b.name)
                return 1;
            return 0;
        });
    };
};
////////////////////////////////////////////////////////////
//////////////////////////CALL LOG//////////////////////////
////////////////////////////////////////////////////////////
function initCallLogsView(){
    var callLogsVM = new CallLogsViewModel();
    ko.applyBindings(callLogsVM, document.getElementById('callLogsView'));

    loadCallLogs(callLogsVM);
}
function loadCallLogs(viewModel, callback){
    $.getJSON(dataSource.callLogs, function(datas) {
        viewModel.callLogs.removeAll();
        for(key in datas){
            viewModel.addCallLogs(datas[key]);
        }
        viewModel.sortCallLogs(datas[key]);

        if(typeof(callback) == "function")
            callback();
    });
}
function CallLogs(_number, _name, _date, _datetime, _duration, _type){
    var self = this;
    self.id;
    self.number = _number;
    self.name = _name;
    self.date = _date;
    self.dateTime = _datetime;
    self.duration = _duration;
    self.type = _type;
}
function CallLogsViewModel(){
    var self = this;

    self.callLogs = ko.observableArray([]);

    self.addCallLogs = function(obj){
        self.callLogs.push(new CallLogs(obj.number, obj.name, obj.date, obj.dateTime, obj.duration, obj.type));
    };
    self.sortCallLogs = function(){
        self.callLogs.sort(function(a,b) {
            if (a.dateTime < b.dateTime)
                return -1;
            if (a.dateTime > b.dateTime)
                return 1;
            return 0;
        });
    };
};