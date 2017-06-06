export default [{
  'key': 'product_management',
  "name": '产品管理',
  "link": [{
    "key": 'ProductManageAccess',
    "name": "产品管理",
    "link": '/pm/product'
  },{
    "key": 'ProductMapAccess',
    "name": "产品地图",
    "link": '/pm/productmap'
  }]
},{
  "key": 'manu_management',
  "name": '生产管理',
  "link": [{
    "key": "ProcessManageAccess",
    "name": "生产环节管理",
    "link": "/mm/process",
  }]
},{
  "key": 'auth_management',
  "name": '权限管理',
  "link": [{
    "key": 'UserManageAccess',
    "name": '用户管理',
    "link": '/am/user',
  },{
    "key": 'RoleAuthManageAccess',
    "name": '角色权限管理',
    "link": '/am/role',
  },{
    "key": "DeptRoleManageAccess",
    "name": "部门角色管理",
    "link": '/am/deptrole',
  },{
    "key": 'SysAuthManageAccess',
    "name": '系统权限管理',
    "link": '/am/sysauth'
  }]
},{
  "key": 'test_qrcode',
  "name": '测试',
  "role": "visitor",
  "link": [{
    "key": "BeltlineManageAccess",
    "name": '生产线',
    "link": '/test/beltline'
  }]
}]