local Test
do
  local _class_0
  local _base_0 = {
    echo = function(self)
      return print(self.str)
    end
  }
  if _base_0.__index == nil then
    _base_0.__index = _base_0
  end
  _class_0 = setmetatable({
    __init = function(self, str)
      self.str = str
    end,
    __base = _base_0,
    __name = "Test"
  }, {
    __index = _base_0,
    __call = function(cls, ...)
      local _self_0 = setmetatable({ }, _base_0)
      cls.__init(_self_0, ...)
      return _self_0
    end
  })
  _base_0.__class = _class_0
  Test = _class_0
end
return Test("Hello World!"):echo()
