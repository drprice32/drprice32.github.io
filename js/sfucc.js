(function() {
    function addUnit(unit, value) {
        return value + unit;
    }
    
    var px = addUnit.bind(undefined, 'px');
    
    function castString(str) {
        if (str === 'true') {
            return true;
        } else if (str === 'false') {
            return false;
        }
        
        return str;
    }
    
    function toggleAttribute(attrName, el) {
        return el.setAttribute(attrName, !castString(el.getAttribute(attrName)));
    }
    
    function toggleTarget(el) {
        var origArg = el;

        if (!el || !el.nodeType) {
            el = document.getElementById(el);
        }
        
        if (el) {
            return function(ev) {
                ev.preventDefault();
                toggleAttribute('aria-expanded', el);
            }
        } else {
            throw new Error("Unable to find target element for toggleTarget");
            return function() {};
        }
    }

    function initMobileNav() {
        if (window.matchMedia('only screen and (max-width:599px)').matches) {
            var
                nav = document.querySelector('[role=navigation]'),
                skipNavLink = nav && nav.querySelector('#skip'),
                navLinkList = nav && nav.querySelector('ul'),
                toggleNavHtml = '<button type="button" id="togglenav" class="icon-list" title="Show Navigation" aria-controls="navlinks">Show Navigation</button>',
                toggleNavBtn
            ;
            
            // Inject the toggle button and grab a reference to it
            skipNavLink && skipNavLink.insertAdjacentHTML('afterend', toggleNavHtml);
            toggleNavBtn = nav && nav.querySelector('#togglenav');

            if (toggleNavBtn) {
                navLinkList.style.setProperty('max-height', px(navLinkList.clientHeight));
                navLinkList.setAttribute('aria-expanded', false);
                toggleNavBtn.addEventListener(
                    'click',
                    toggleTarget(navLinkList),
                    false
                );
            }
        }
    }
    
    window.addEventListener('DOMContentLoaded', function() {
        var rootClasses = document.documentElement.classList;
        if (rootClasses) {
            rootClasses.remove('no-js');
            rootClasses.add('js');
        }

        initMobileNav();
    }, false);
})();