////////////////////////////////////////////////////////////
//////////////////////////COMMON////////////////////////////
////////////////////////////////////////////////////////////
function getCharArray(){
	var charArray = [];
	for(var i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++) {
		charArray.push(String.fromCharCode(i));
	}
	return charArray;
}
////////////////////////////////////////////////////////////
//////////////////////////CONTACTS//////////////////////////
////////////////////////////////////////////////////////////
function loadContactsView(){
	//$.getJSON('../../datas/testDataset/contacts.json', function(datas) {
	$.getJSON('datas/testDataset/contacts.json', function(datas) {
		for(key in datas){
			cvm.addContact(datas[key]);
		}
		cvm.sortContacts(datas[key]);
		
		$("#contactsList li").each(function(index, element) {
			var letter = $(this).children().children('span').text().charAt(0);
			if ($("#letter"+letter).length < 1) {
				$("#contactsList").append($('<li class="groupLetter"><span id="letter'+letter+'">'+letter+'</span><ul></ul></li>'));
			}
			$(this).appendTo($("#letter"+letter).next());
		});
		
		$("#shortcut-contact a").click(function(){
			var c = $(this).text();
			$('.sidebar').animate({
				scrollTop: $("#letter"+c).offset().top - $("#contactsList").offset().top
			}, 'slow');
		});
	});
	
	var cvm = new ContactsViewModel();
	ko.applyBindings(cvm, document.getElementById('contactsView'));
}

function Contact(n, i, p, e){
	var self = this;
	self.id;
	self.name = n;
	self.contactImg = "graphics/seeContactImg.xhtml?contactId=0" || i;
	self.phones = [] || p;
	self.emails = [] || e;
}

function ContactsViewModel(){
	var self = this;
	
	self.selectedContact = ko.observable();
	self.shortcuts = ko.observableArray(['#'].concat(getCharArray()));
	self.contacts = ko.observableArray([]);
	self.addContact = function(obj){
		self.contacts.push(obj);
	};
	self.select = function(contact){
		self.selectedContact(contact);
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
		console.log("L'index doit être un entier positif.");
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
};
////////////////////////////////////////////////////////////
/////////////////////////////SMS////////////////////////////
////////////////////////////////////////////////////////////
function loadSmsView(){
	//$.getJSON('../../datas/testDataset/smsThreads.json', function(datas) {
	$.getJSON('datas/testDataset/smsThreads.json', function(datas) {
		for(key in datas){
			smsVM.addThread(datas[key]);
		}
		smsVM.sortThreads(datas[key]);
		
		$(".sms-item").click(function(){
			$(this).addClass('selected');;
		});
	});
	
	var smsVM = new SmsViewModel();
	ko.applyBindings(smsVM, document.getElementById('smsView'));
}

function SmsViewModel(){
	var self = this;
	
	self.selectedThread = ko.observable();
	self.threads = ko.observableArray([]);
	self.addThread = function(obj){
		self.threads.push(obj);
	};
	self.selectThread = function(thread){
		self.selectedThread(thread);
		$.getJSON('datas/testDataset/sms.json', function(datas){
			for(key in datas){
				if(datas[key].threadId == thread.id){
					console.log(datas[key]);
					self.currentChat(datas[key]);
				}
			}
		});
	};
	self.sortThreads = function(){
		self.threads.sort(function(a,b) {
			if (a.date < b.date)
				return -1;
			if (a.date > b.date)
				return 1;
			return 0;
		});
	};
	
	self.currentChat = ko.observable();
	
	self.selectedSms = ko.observable();
	self.sms = ko.observableArray([]);
	self.addSms = function(obj){
		self.sms.push(obj);
	};
	self.selectSms = function(sms){
		self.selectedSms(sms);
	};
	self.sortSms = function(){
		self.sms.sort(function(a,b) {
			if (a.date < b.date)
				return -1;
			if (a.date > b.date)
				return 1;
			return 0;
		});
	};
};