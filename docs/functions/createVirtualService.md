[**cross-domain-emitter**](../README.md)

***

> **createVirtualService**(`instance`, `eventName`): `object`

Defined in: core/EventBus/virtualService.ts:24

返回 模拟的 Broswer/Server 模式 的请求。
请求标识：eventName 即http请求中的请求路径
set: 设置响应的处理函数（调用resolve 发送处理结果）/或固定的值
get：发起请求 获取set 设置的数据
on: 接收 set 主动推送的数据变化
off: 停止接收set 主动推送的数据变化
destroy: 销毁

## Parameters

### instance

[`EventBus`](../classes/EventBus.md)

### eventName

`string`

## Returns

`object`

### destroy()

> **destroy**(): `void`

#### Returns

`void`

### get()

> **get**(): `Promise`\<`unknown`\>

#### Returns

`Promise`\<`unknown`\>

### off()

> **off**(`callBack`): `void`

#### Parameters

##### callBack

(`data`) => `void`

#### Returns

`void`

### on()

> **on**(`callBack`): `void`

#### Parameters

##### callBack

(`data`) => `void`

#### Returns

`void`

### set()

> **set**(`callBack`, `clear`): `void`

#### Parameters

##### callBack

`unknown`

##### clear

`boolean` = `true`

#### Returns

`void`
