// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var formElem;
var doneMap = jsonToMap(localStorage.getItem('doneList')) || new Map();

function dragElement(elmnt) {
  document.getElementById(elmnt.id + "Head").style.cursor = "move";
  var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;

  if (document.getElementById(elmnt.id + "Head")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "Head").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault(); // get the mouse cursor position at startup:

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement; // call a function whenever the cursor moves:

    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault(); // calculate the new cursor position:

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY; // set the element's new position:

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function createTable() {
  document.getElementById('createTable').classList.add('active');
}

function hideCreateTable() {
  document.getElementById('createTable').classList.remove('active');
}

function createTask(title, body) {
  var timestamp;

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  console.log(args);

  if (args.length !== 0) {
    timestamp = args[0];
    console.log(timestamp);
  } else {
    timestamp = new Date().getTime();
  }

  var task = new Task(title, body, timestamp);
  task = JSON.stringify(task);
  localStorage.setItem(title + timestamp.toString(), task);
  renderTask(title + timestamp.toString());
}

function renderAllTasks() {
  for (var _i = 0, _Object$keys = Object.keys(localStorage); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    if (key !== 'doneList') renderTask(key);
  }

  console.log(localStorage.getItem('doneList'));
}

function renderTask(key) {
  var lcTaskData = JSON.parse(localStorage.getItem(key));
  var lcTaskTitle = lcTaskData._title;
  var lcTaskBody = lcTaskData._body;

  var lcTaskTimestamp = lcTaskData._args[0].toString(); // EditForm creation


  var wrapper = document.getElementById('wrapper');
  var task = document.createElement('div');
  task.classList.add('task');
  var form = document.createElement('form');
  form.classList.add('taskEditForm');
  var taskTitleEdit = document.createElement('input');
  taskTitleEdit.classList.add('taskTitleEdit');
  taskTitleEdit.type = 'text';
  taskTitleEdit.value = lcTaskTitle;
  var taskBodyEdit = document.createElement('input');
  taskBodyEdit.classList.add('taskBodyEdit');
  taskBodyEdit.type = 'text';
  taskBodyEdit.value = lcTaskBody;
  var taskSave_btn = document.createElement('input');
  taskSave_btn.classList.add('taskSave_btn');
  taskSave_btn.type = 'button';
  taskSave_btn.value = "Save";
  taskSave_btn.addEventListener('click', onSaveClick); // Task data 

  var taskData = document.createElement('div');
  taskData.classList.add('taskData');
  var taskTitle = document.createElement('h3');
  taskTitle.appendChild(document.createTextNode(lcTaskTitle));
  taskTitle.classList.add('taskTitle');
  var taskBody = document.createElement('p');
  taskBody.appendChild(document.createTextNode(lcTaskBody));
  taskBody.classList.add('taskBody');
  var taskBtns = document.createElement('div');
  taskBtns.classList.add('taskBtns');
  var taskEdit_btn = document.createElement('button');
  taskEdit_btn.type = 'button';
  taskEdit_btn.classList.add('taskEdit_btn');
  taskEdit_btn.appendChild(document.createTextNode('Edit'));
  taskEdit_btn.addEventListener('click', toggleEdit);
  var taskDelete_btn = document.createElement('button');
  taskDelete_btn.type = 'button';
  taskDelete_btn.classList.add('taskDelete_btn');
  taskDelete_btn.appendChild(document.createTextNode('Delete'));
  taskDelete_btn.addEventListener('click', onDeleteClick);
  var taskDone_btn = document.createElement('button');
  taskDone_btn.type = 'button';
  taskDone_btn.classList.add('taskDone_btn');
  taskDone_btn.appendChild(document.createTextNode('Done'));
  taskDone_btn.addEventListener('click', onDoneClick); // Task timestamp

  var tmstmp = document.createElement('p');
  tmstmp.classList.add('taskTimestamp');
  tmstmp.appendChild(document.createTextNode(lcTaskTimestamp)); // if (localStorage.getItem('doneList') == true) {
  //     task.classList.add('done');
  // }

  if (jsonToMap(localStorage.getItem('doneList')).get(lcTaskTimestamp) == true) {
    task.classList.add('done');
  }

  wrapper.appendChild(task);
  task.appendChild(form);
  form.appendChild(taskTitleEdit);
  form.appendChild(taskBodyEdit);
  form.appendChild(taskSave_btn);
  task.appendChild(taskData);
  taskData.appendChild(taskTitle);
  taskData.appendChild(taskBody);
  taskData.appendChild(taskBtns);
  taskBtns.appendChild(taskEdit_btn);
  taskBtns.appendChild(taskDelete_btn);
  taskBtns.appendChild(taskDone_btn);
  task.appendChild(tmstmp);
}

function toggleEdit(event) {
  event.preventDefault();
  event.target.style.visibility = 'hidden';
  event.target.parentNode.parentNode.parentNode.childNodes[0].classList.add('active');
  event.target.parentNode.parentNode.style.display = "none";
}

function onDeleteClick(event) {
  event.preventDefault();
  var node = event.target.parentNode.parentNode.parentNode;
  var title = event.target.parentNode.parentNode.childNodes[0].innerHTML;
  var timestamp = node.childNodes[2].innerHTML;
  localStorage.removeItem(title + timestamp.toString());
  node.remove();
}

function onSaveClick(event) {
  event.preventDefault();
  var target = event.target.parentNode;
  var newTitle = target.childNodes[0].value;
  var newBody = target.childNodes[1].value;
  var tmsp = target.parentNode.childNodes[2].innerHTML;
  var oldTitle = target.parentNode.childNodes[1].childNodes[0].innerHTML;
  localStorage.removeItem(oldTitle + tmsp);
  createTask(newTitle, newBody, tmsp);
  target.parentNode.remove();
}

function onDoneClick(event) {
  event.preventDefault();
  var target = event.target.parentNode.parentNode.parentNode;
  target.classList.add('done');
  doneMap.set(target.childNodes[2].innerHTML, true);
  console.log(JSON.stringify(doneMap));
  localStorage.setItem('doneList', mapToJson(doneMap));
  console.log(localStorage.getItem('doneList'));
}

function rootClearStorage() {
  localStorage.clear();
}

function addFormDataListener() {
  formElem.addEventListener('formdata', function (e) {
    // Get the form data from the event object
    var data = Array.from(e.formData);

    if (data[0][1] !== '') {
      createTask(data[0][1], data[1][1]);
    } // Array[['title', title], ['description', body]]

  });
}

function onSubmit(event) {
  event.preventDefault();
  new FormData(formElem);
}

function ready() {
  dragElement(document.getElementById("createTable"));
  document.getElementById('addNew_btn').addEventListener('click', createTable);
  document.getElementById('cancel_btn').addEventListener('click', hideCreateTable);
  document.getElementById('createForm').addEventListener('submit', onSubmit);
  formElem = document.getElementById('createForm');
  addFormDataListener(); // rootClearStorage();

  renderAllTasks();
}

var Task = /*#__PURE__*/function () {
  function Task(title, body) {
    _classCallCheck(this, Task);

    this._title = title;
    this._body = body;

    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    if (args) {
      this._args = args;
    }
  }

  _createClass(Task, [{
    key: "title",
    get: function get() {
      return this._title;
    },
    set: function set(value) {
      this._title = value;
    }
  }, {
    key: "body",
    get: function get() {
      return this._body;
    },
    set: function set(value) {
      this._body = value;
    }
  }, {
    key: "args",
    get: function get() {
      return this._args;
    }
  }]);

  return Task;
}(); // function TaskFormObj(obj){
// }


document.addEventListener("DOMContentLoaded", ready);

function mapToJson(map) {
  return JSON.stringify(_toConsumableArray(map));
}

function jsonToMap(jsonStr) {
  return new Map(JSON.parse(jsonStr));
}
},{}],"C:/Users/sykor/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49864" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/sykor/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/todolist.e31bb0bc.js.map