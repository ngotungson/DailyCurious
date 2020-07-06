"use strict";

// -------------------
// External Links and HTTP2HTTPS
(function() {

    var _links = [].slice.call(document.querySelectorAll('a'));
        _links.forEach( function(el) {

            if ( !!el.getAttribute('href') === true ) {

                var _href = el.getAttribute('href').toString();
                var _target = ( el.hasAttribute('target') ) ? el.getAttribute('target') : false;
                var is_external = (!!_href.match('^(http|https)://')) && (_href.indexOf('sematext.com') === -1);

                if ( is_external && !_target ) {

                    el.setAttribute('target', '_blank');
                }

                // -----------
                // Force https
                el.href = _href.replace(/^http:\/\/(.*sematext.com.*)/i, "https://$1");
            }
        });
})();


// Add ID top menu registration button
(function() {

    var _topmenu_reg = document.querySelector('#menu-main-navigation #menu-item-7326 a');
    if ( !!_topmenu_reg ) {
        _topmenu_reg.setAttribute('id', 'reg-top-menu');
    }

})();


// Integrations Page
function integrationsPage() {

    var _list = document.querySelector('ul#integrations-list');
    var _info = document.querySelector('ul#integrations-info-dev');

        function _show_info(id) {

            var _info_items = [].slice.call(_info.querySelectorAll('li[id^="integration-"]'));
                _info_items.forEach(function(el) {
                    el.style.display = 'none';
                });

            if (!!id && !!_info.querySelector('li#' + id)) {
                _info.querySelector('li#' + id).style.display = 'flex';

                var _cardTop = jQuery('ul#integrations-info-dev').offset().top;
                jQuery('html,body').animate({ scrollTop: _cardTop - 120 }, 350);
            }
        }

        var _list_items = [].slice.call(_list.querySelectorAll('li a'));
            _list_items.forEach(function(el) {
                if (el.href.indexOf('#') > -1) {
                    el.onclick = function(e) {
                        e.preventDefault();
                        var _hash = this.href.split('#')[1];
                        _show_info(_hash);
                    }
                }
            });


        var url_hash = window.location.hash.split('#')[1];
        window.setTimeout( function() {
            _show_info(url_hash);
        }, 500 );


    // Buttons (Tabs)
    var _buttons = [].slice.call( document.querySelectorAll('.integration-content-tabs button') );
        _buttons.forEach(function(el, i) {
            el.onclick = function() {

                var _grandpa = this.parentNode.parentNode;

                    _grandpa.querySelector('.integration-content-text .integration-content-description').style.display = 'none';
                    _grandpa.querySelector('.integration-content-text .integration-content-metrics').style.display = 'none';
                    _grandpa.querySelector('.integration-content-text .integration-content-logs').style.display = 'none';
                    _grandpa.querySelector('.integration-content-text .integration-content-traces').style.display = 'none';

                    _grandpa.querySelector('.integration-content-text .integration-content-' + this.dataset.open).style.display = 'block';


                var _pa = this.parentNode;

                    if (_pa.querySelector('button[data-open="description"]')) _pa.querySelector('button[data-open="description"]').classList.remove('active');
                    if (_pa.querySelector('button[data-open="metrics"]')) _pa.querySelector('button[data-open="metrics"]').classList.remove('active');
                    if (_pa.querySelector('button[data-open="logs"]')) _pa.querySelector('button[data-open="logs"]').classList.remove('active');
                    if (_pa.querySelector('button[data-open="traces"]')) _pa.querySelector('button[data-open="traces"]').classList.remove('active');


                    _pa.querySelector('button[data-open="'+ this.dataset.open +'"]').classList.add('active');
            }
        })

    // Close Buttons
    function close_card() {

        _show_info();

        var _cardsTop = jQuery('.integrations-block').offset().top;
        jQuery('html,body').animate({ scrollTop: _cardsTop - 130 }, 350);
    }

    var _int_items = [].slice.call( document.querySelectorAll('li[id^="integration-"]') );
        _int_items.forEach(function(el) {

            var _integration_desc = el.querySelector('.integration-desc');

            var _integration_desc_close = document.createElement('a');
                _integration_desc_close.setAttribute('class', 'integration-info-close');
                _integration_desc_close.setAttribute('href', '#' + el.id);
                _integration_desc_close.setAttribute('title', 'Close');
                _integration_desc_close.innerHTML = '&#10005;';
                _integration_desc_close.onclick = function(e) {

                    close_card();
                    e.preventDefault();
                }

            _integration_desc.appendChild( _integration_desc_close );
        });

    document.addEventListener('keydown', function(e) {

        e = e || window.event;
        var isESC = false;
            isESC = ("key" in e) ? (e.key == "Escape" || e.key == "Esc") : (e.keyCode == 27);

        if (isESC) {

            close_card();
        }
    });
}


// Lazy loading
var dozy = (function() {

    var dozyObserver = new IntersectionObserver(

        function(entries) {
            [].forEach.call(entries, function(entry) {
                if (entry.isIntersecting) {

                    dozyObserver.unobserve(entry.target)

                    var _src = entry.target.dataset.src;
                    var _srcset = entry.target.dataset.srcset;
                    entry.target.setAttribute('src', _src);
                    entry.target.removeAttribute('data-src');

                    if ( !!_srcset ) {
                        entry.target.setAttribute('srcset', _srcset);
                        entry.target.removeAttribute('data-srcset');
                    }

                    window.setTimeout(function() {
                        entry.target.classList.add('dozyloaded');
                    }, 500);
                }
            });
        }, {
            root: null,
            rootMargin: "0px 0px 0px 0px",
            threshold: 0
        }
    );

    var _targets = document.querySelectorAll('img.dozyload');
        [].forEach.call(_targets, function(_target) {
        dozyObserver.observe(_target);
    });

})();

// -------------------
var Sematext =  (function() {

    function services() {

        var callToActionLink = document.querySelector('.call-to-action a[href="#contact-us-form"]');
        if (!!callToActionLink) {
            callToActionLink.onclick = function(e) {
                e.preventDefault();
                document.querySelector('#contact-us-form')
                    .scrollIntoView({
                        block: "start",
                        behavior: "smooth"
                    });
            }
        }

        var plansPricingLink = document.querySelector('.call-to-action a[href="#plans-and-pricing"]');
        if (!!plansPricingLink) {

            plansPricingLink.onclick = function(e) {
                e.preventDefault();
                document.querySelector('#plans-and-pricing')
                    .scrollIntoView({
                        block: "start",
                        behavior: "smooth"
                    });
            }
        }
    }

    function metricsAndLogs() {

        var _modals = document.querySelectorAll('#metrics-logs-modals li');
        var _modals_close = function() {
            _modals.forEach(function(el, i){
                el.style.display = 'none';
            });
        }
        _modals_close();
        var _triggers = document.querySelectorAll('#metrics-logs-menu a, #metrics-logs-dots a');
            _triggers.forEach(function(el, i){
                el.onclick = function(e) {

                    e.preventDefault();
                    _modals_close();
                    var _target = document.querySelector('#metrics-logs-modals ' + this.hash);
                        _target.style.display = ( _target.style.display == 'none' )
                            ? 'block'
                            : 'none';
                }
            });
    }

    function aboutPics() {

        if ( !!document.querySelector('#about-pics') === false ) { return };

        var _w = window.innerWidth;
        var _pics_container = document.querySelector('#about-pics figure');
        var _pics_imgs = _pics_container.querySelectorAll('img');

        var _pic_active = Math.floor( Math.random() * _pics_imgs.length );

        var _pics_w = 0;
        for (var i = 0; i < _pics_imgs.length; i++) {
            _pics_w += _pics_imgs[i].width;
        }

        var _pics_margin = Math.round((_w - _pics_imgs[_pic_active].width)/2);
            _pics_container.style.marginLeft = _pics_margin + 'px';


        function _pic_set(item) {

            _pic_active = item;
            var _pics_offset = 0;
            for (var i = 0; i < item; i++) {
                _pics_offset += _pics_imgs[i].width;
            }

            _pics_container.style.marginLeft = (_pics_margin - _pics_offset) + 'px';

            for (var i = 0; i < _pics_imgs.length; i++) {
                _pics_imgs[i].classList.remove('active');
            }
            _pics_imgs[_pic_active].classList.add('active');
        }
        _pic_set(_pic_active);


        var _prev = document.querySelector('#about-pics #about-pics-prev');
        var _next = document.querySelector('#about-pics #about-pics-next');

            _next.onclick = function(e) {
                e.preventDefault();
                var _i = (_pic_active < (_pics_imgs.length-1)) ? (_pic_active + 1) : 0;
                _pic_set(_i);
            }
            _prev.onclick = function(e) {
                e.preventDefault();
                var _i = (_pic_active > 0) ? (_pic_active - 1) : (_pics_imgs.length-1);
                _pic_set(_i);
            }
    }

    function showDownloadModal(str) {

        var _modal = document.querySelector('#download-modal');
        var _filename = _modal.querySelector('#download-modal-filename');
            _filename.innerHTML = str;
            _modal.classList.remove('closed');

        var modal_close = document.querySelector('#download-modal-close')
            modal_close.onclick = function(e) {
                e.preventDefault();
                _modal.classList.add('closed');
            }
    }

    function logsenePricing() {

        var compareFeaturesLink = document.querySelector('.logs-features a[href="#logsene-features"]');
        if (!!compareFeaturesLink) {

            compareFeaturesLink.onclick = function(e) {

                var _self = this;
                window.setTimeout(function() {
                    var is_expanded = _self.getAttribute('aria-expanded') === 'true';
                    if (is_expanded) {
                        document.querySelector('div.logs-features')
                            .scrollIntoView({
                                block: "start",
                                behavior: "smooth"
                            });
                    }

                }, 100);
            }
        }


        var getintouchLink = document.querySelector('#getintouch');
        if (!!getintouchLink) {

            getintouchLink.onclick = function(e) {
                e.preventDefault();

                window.setTimeout(function() {

                    var is_expanded = compareFeaturesLink.getAttribute('aria-expanded') === 'true';
                    if ( is_expanded ) { compareFeaturesLink.click(); }
                    document.querySelector('div.logs-features')
                        .scrollIntoView({
                            block: "start",
                            behavior: "smooth"
                        });

                }, 100);
            }
        }


    }

    function moreCustomers() {

        return;

        /*
        var customerList = document.querySelector('.about-customers .about-customers-list');
        if (customerList) {

            var initialHeight = customerList.offsetHeight;
            var cardHeight = 180;

            customerList.style.height = cardHeight*3 + 'px'; // Init to 3 rows
            document.querySelector('#about-customers-more a').onclick = function(e) {
                e.preventDefault();

                var currentHeight = customerList.offsetHeight;
                var newHeight = customerList.offsetHeight + cardHeight;

                if ( newHeight > initialHeight ) {

                    document.querySelector('#about-customers-more').style.opacity = 0;
                    document.querySelector('#about-customers-more').style.height = '0px';
                    customerList.style.height = 'auto';
                    window.setTimeout(function() { document.querySelector('#about-customers-more').style.display = 'none'; }, 1000);

                } else {

                    customerList.style.height = newHeight + 'px';
                }
            }
        }
        */
    }

    /*
    function trainingOverview() {

        var trainingTable = document.querySelector('.training-overview-table .container table');
        var trainingTableRows = [].slice.call( trainingTable.querySelectorAll('tbody tr') );
        var showMoreButton = document.querySelector('.training-overview-table .container.text-center p.std a.btn.btn-lg');

        function hideButton() {
            showMoreButton.parentNode.style.display = 'none';
        }

        function showTableRows(limit) {

            if (!limit || limit >= trainingTableRows.length ) {
                limit =  trainingTableRows.length;
                hideButton();
            }
            trainingTableRows.forEach(function(el, i) {
                el.style.display = (i >= limit) ? 'none' : 'table-row';
            });
        }

        showMoreButton.onclick = function(e) {
            e.preventDefault();
            showTableRows();
            document.querySelector('.training-overview-table')
                .scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                });

        }

        // Init to show only 6 rows
        showTableRows(6);
    }
    */

    function trainingClasses() {

        var trainingTable = document.querySelector('.training-classes-table .container table');
        var trainingTableRows = [].slice.call( trainingTable.querySelectorAll('tbody tr') );
        var showMoreButton = document.querySelector('.training-classes-table .container.text-center p.std a.btn.btn-lg');

        function hideButton() { showMoreButton.parentNode.style.display = 'none'; }

        function showTableRows(limit) {

            if (!limit || limit >= trainingTableRows.length ) {
                limit =  trainingTableRows.length;
                hideButton();
            }
            trainingTableRows.forEach(function(el, i) { el.style.display = (i >= limit) ? 'none' : 'table-row'; });
        }

        showMoreButton.onclick = function(e) {
            e.preventDefault();
            showTableRows();
            document.querySelector('.training-classes-table')
                .scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                });

        }

        // Set limit and Init ...
        var limit = ( !!the_limit ) ? the_limit : 8; // Defaults to 8
        showTableRows(limit);
    }

    return {
        services : services,
        metricsAndLogs : metricsAndLogs,
        aboutPics : aboutPics,
        showDownloadModal : showDownloadModal,
        logsenePricing : logsenePricing,
        moreCustomers : moreCustomers,
        // trainingOverview : trainingOverview,
        trainingClasses : trainingClasses
    }

})();

if ( typeof(WP_Template) !== 'undefined' ) {

    Sematext[WP_Template]();
}


// MM : Products List items (Cloud)
(function() {

    var mm_prods = document.querySelectorAll('.mm-v4 .mm-v4-cloud ul.mm-ul-prod li');
        mm_prods = Array.from(mm_prods);
        mm_prods.forEach(function(el, i) {
            var mm_prod_link = Array.from( el.querySelectorAll('a') );
                mm_prod_link = mm_prod_link[0].href

            el.dataset.link = mm_prod_link;
            el.style.cursor = 'pointer';
            el.addEventListener('click', function(e) {
                e.stopPropagation();
                window.location = this.dataset.link;
            })
        });

})();


// MM:Events when opening submenu
var mm_hotjar = (function() {

    function trigger_event(trigger, selector) {
        var _items = Array.from(document.querySelectorAll(selector));
            _items.forEach(function(el) {
                el.addEventListener('click', function() {
                    if (!this.parentNode.classList.contains('open')) {

                        window.setTimeout(function() {

                            try {
                                // console.log(trigger, selector);
                                hj('trigger', trigger);
                            } catch(e) {}

                        }, 500);
                    }
                })
            });
    }

    var _events = [

        {   // Products
            'trigger' : 'opened_mm',
            'selector' : '#menu-main-navigation #menu-item-7185 button'
        },
        {   // Services
            'trigger' : 'opened_mm_services',
            'selector' : '#menu-main-navigation > #menu-item-41576 > button, #menu-main-navigation > #menu-item-41375 button'
        },
        {   // Resources
            'trigger' : 'opened_mm_resources',
            'selector' : '#menu-main-navigation > #menu-item-7204 > button'
        },
        {   // About
            'trigger' : 'opened_mm_about',
            'selector' : '#menu-main-navigation > #menu-item-7205 > button'
        }
    ];
    _events.forEach( function(i) { trigger_event(i.trigger, i.selector) });

})();


// MM : Services Submenu
document.addEventListener('DOMContentLoaded', function() {

    var mm_services = (function() {

        var _str = 'Upcoming Solr and Elasticsearch Online Training Classes';
        var _lnk = {
            txt : 'See Online Classes',
            ref : 'https://sematext.com/training/'
        }

        var _p = document.createElement('span');
            _p.appendChild( document.createTextNode(_str) );

        var _a = document.createElement('a');
            _a.appendChild( document.createTextNode(_lnk.txt) )
            _a.setAttribute('href', _lnk.ref);

        var _div = document.createElement('li');
            _div.setAttribute('class', 'mm_services_notice');
            _div.appendChild( _p );
            _div.appendChild( _a );

        var _mm_services_lis = Array.from(document.querySelectorAll( 'ul#menu-main-navigation > li#menu-item-41576 > ul.dropdown-menu, ul#menu-main-navigation > li#menu-item-41375 > ul.dropdown-menu' )); // live, dev
            _mm_services_lis.forEach(function(el) { el.appendChild(_div) });

    })();

});

// MM : Resources submenu
document.addEventListener('DOMContentLoaded', function() {

    var mm_resources = (function() {

        var _mp = {

            // Set those on init
            items : [],
            total_items : null,

            // -----
            current_item : 0,
            set_item : function() {

                var _item_id = this.items[this.current_item][1];
                    _item_id = _item_id.replace(/^\/|\/$/g, '');
                    _item_id = _item_id.split('/');
                    _item_id = _item_id[_item_id.length-1];
                var _item_title = this.items[this.current_item][0];

                // Title
                _mostpopular_li.querySelector('.rsc-mostpopular-footer h4').innerHTML = this.items[this.current_item][0];

                // Download Link
                _mostpopular_li.querySelector('.rsc-mostpopular-footer a#rsc-download-link').href = this.items[this.current_item][1];

                // Image
                var _imgbaseurl = _mostpopular_li.querySelector('figure img').dataset.baseurl;
                _mostpopular_li.querySelector('figure img').src = _imgbaseurl + '/inc/images/mostpopular/' + _item_id + '.jpg';
                _mostpopular_li.querySelector('figure img').alt = this.items[this.current_item][0];

                // Active dot
                var _mp_dots = _mp_dot_list.querySelectorAll('li');
                for ( var z = 0; z < this.total_items; z++) {

                    var _a = _mp_dots[z].querySelector('a');
                    if ( z == this.current_item ) {
                        _a.classList.add('active');
                    } else {
                        _a.classList.remove('active');
                    }
                }
            },
            goto_item : function(i) {
                this.current_item = i;
                this.set_item();
            },
            next_item : function() {
                var _i = ( this.current_item++ >= (this.total_items-1) ) ? 0 : this.current_item++;
                this.current_item = _i;
                this.set_item();
            },
            prev_item : function() {
                var _i = ( this.current_item-- <= 0 ) ? this.total_items-1 : this.current_item--;
                this.current_item = _i;
                this.set_item();
            }
        }

        var _mostpopular_li = document.querySelector('.menu-item-7204 > ul.dropdown-menu > li:nth-child(7)');
        var _mostpopular_ul = _mostpopular_li.querySelector('ul.dropdown-menu');

        // Mobile
        var _mp_ss_data = _mostpopular_li.innerHTML;
        var _mp_mobile_div = document.createElement('div');
            _mp_mobile_div.id = 'resources-most-popular-box-mobile';
            _mp_mobile_div.innerHTML = _mp_ss_data;

            // ...
            _mostpopular_li.className = 'menu-item-has-children';
            _mostpopular_li.innerHTML = '';

        var _mostpopular_tpl = document.querySelector('template#resources-most-popular').innerHTML;
            _mostpopular_li.innerHTML = _mostpopular_tpl;

        // Inject Mobile list
        _mostpopular_li.appendChild(_mp_mobile_div);

        // Get all the items from existing list
        var _mostpopular_items = [];
        [].forEach.call( _mostpopular_ul.querySelectorAll('li a'), function(el, i) {
            _mostpopular_items.push([el.title, el.href]);
        });

        // -> _mp = {}

        // Init _mp Object
        _mp.items = _mostpopular_items;
        _mp.total_items = _mostpopular_items.length;

        // Create a new list from previous list
        var _mp_dot_list = document.createElement('ul');
            _mostpopular_items.forEach(function(el, i) {

                var _li = document.createElement('li');

                    var _a = document.createElement('a');
                        _a.dataset.item = i;
                        _a.innerHTML = el[0];
                        _a.href = el[1];
                        _a.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            _mp.goto_item( this.dataset.item );
                        });

                _li.appendChild(_a);
                _mp_dot_list.appendChild(_li);
            });


        // Inject list on the template
        _mostpopular_li.querySelector('.rsc-mostpopular-footer').appendChild( _mp_dot_list );

        // Prev & Next Buttons
        _mostpopular_li.querySelector('.rsc-mostpopular-nav #prev').addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            _mp.prev_item();
        });
        _mostpopular_li.querySelector('.rsc-mostpopular-nav #next').addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            _mp.next_item();
        });

        // Init _mp
        _mp.set_item();

    })();

    var mm_resources_headers = (function() {

        var _hlinks = document.querySelectorAll('.menu-item-7204 > ul.dropdown-menu > li > a');
            _hlinks = Array.from(_hlinks);
            _hlinks.forEach(function(el, i) {

                if ( el.href.indexOf('#') >= 0 ) {

                    var _txt = document.createElement('h5');
                        _txt.className = 'mm_header';
                        _txt.appendChild( document.createTextNode(el.innerHTML) );

                    el.parentNode.insertBefore(_txt, el);
                    el.parentNode.removeChild(el);
                }
            });
    })();

});


// Case Study Cards
var _csc = document.querySelectorAll('.gamma-case-studies-cards figure');
if (_csc.length > 1) {

    var _csc_current = 0;
    var _csc_limit = _csc.length;

    function show_csc_item(i) {
        document.querySelector('.gamma-case-study-card-wrapper figure:first-child').style.marginLeft = "-"+(i*100)+"%";
    }

    document.querySelector('.gamma-case-study-card-nav a[rel="prev"]').addEventListener('click', function(e) {
        e.preventDefault();
        _csc_current = ((_csc_current-1) < 0) ? (_csc_limit-1) : _csc_current-1;
        show_csc_item(_csc_current);
    });
    document.querySelector('.gamma-case-study-card-nav a[rel="next"]').addEventListener('click', function(e) {
        e.preventDefault();
        _csc_current = ((_csc_current+1) >= _csc_limit) ? 0 : _csc_current+1;
        show_csc_item(_csc_current);
    });

    show_csc_item(0);
} else if(_csc.length == 1) {

    document.querySelector('.gamma-case-study-card-nav a[rel="prev"]').style.display = 'none';
    document.querySelector('.gamma-case-study-card-nav a[rel="next"]').style.display = 'none';
}
