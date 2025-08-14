[**cross-domain-emitter**](../README.md)

***

Defined in: window/client/index.ts:4

## Extends

- [`WindowEventBus`](WindowEventBus.md)

## Constructors

### Constructor

> **new WindowClient**(`uuidKey`): `WindowClient`

Defined in: window/WindowEventBus/index.ts:15

#### Parameters

##### uuidKey

`string`

#### Returns

`WindowClient`

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`constructor`](WindowEventBus.md#constructor)

## Properties

### emitters

> **emitters**: [`EventBus`](EventBus.md)[] = `[]`

Defined in: core/EventBus/index.ts:9

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`emitters`](WindowEventBus.md#emitters)

***

### id

> **id**: `string`

Defined in: core/EventBus/index.ts:7

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`id`](WindowEventBus.md#id)

***

### store

> **store**: [`Store`](Store.md)

Defined in: window/WindowEventBus/index.ts:13

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`store`](WindowEventBus.md#store)

***

### transceivers

> **transceivers**: [`BaseTransceiver`](BaseTransceiver.md)[] = `[]`

Defined in: core/EventBus/index.ts:8

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`transceivers`](WindowEventBus.md#transceivers)

***

### windowTransceivers

> **windowTransceivers**: `Map`\<`Window`, [`WindowTransceiver`](WindowTransceiver.md)\>

Defined in: window/WindowEventBus/index.ts:14

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`windowTransceivers`](WindowEventBus.md#windowtransceivers)

## Methods

### addEmitter()

> **addEmitter**(`emiter`): `void`

Defined in: core/EventBus/index.ts:108

#### Parameters

##### emiter

[`EventBus`](EventBus.md)

#### Returns

`void`

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`addEmitter`](WindowEventBus.md#addemitter)

***

### addWindowTransceiver()

> **addWindowTransceiver**(`option`): [`WindowTransceiver`](WindowTransceiver.md)

Defined in: window/WindowEventBus/index.ts:19

#### Parameters

##### option

[`createWindowTransceiverOption`](../interfaces/createWindowTransceiverOption.md)

#### Returns

[`WindowTransceiver`](WindowTransceiver.md)

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`addWindowTransceiver`](WindowEventBus.md#addwindowtransceiver)

***

### bindTransceiver()

> **bindTransceiver**(`transceiver`): `void`

Defined in: core/EventBus/index.ts:82

#### Parameters

##### transceiver

[`BaseTransceiver`](BaseTransceiver.md)

#### Returns

`void`

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`bindTransceiver`](WindowEventBus.md#bindtransceiver)

***

### clearTransceiver()

> **clearTransceiver**(): `void`

Defined in: core/EventBus/index.ts:102

#### Returns

`void`

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`clearTransceiver`](WindowEventBus.md#cleartransceiver)

***

### clearWindowTransceiver()

> **clearWindowTransceiver**(): `void`

Defined in: window/WindowEventBus/index.ts:59

#### Returns

`void`

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`clearWindowTransceiver`](WindowEventBus.md#clearwindowtransceiver)

***

### createIframeTransceiver()

> **createIframeTransceiver**(`host`): [`WindowTransceiver`](WindowTransceiver.md)

Defined in: window/client/index.ts:5

#### Parameters

##### host

`string`

#### Returns

[`WindowTransceiver`](WindowTransceiver.md)

***

### emit()

> **emit**(`eventName`, `data?`, `option?`, `transceivers?`): `WindowClient`

Defined in: core/EventBus/index.ts:10

#### Parameters

##### eventName

`string`

##### data?

`unknown`

##### option?

[`SignalOption`](../interfaces/SignalOption.md)

##### transceivers?

[`BaseTransceiver`](BaseTransceiver.md) | [`EventBus`](EventBus.md) | ([`BaseTransceiver`](BaseTransceiver.md) \| [`EventBus`](EventBus.md))[]

#### Returns

`WindowClient`

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`emit`](WindowEventBus.md#emit)

***

### findWindowTransceiverByWindowIds()

> **findWindowTransceiverByWindowIds**(`ids`): [`BaseTransceiver`](BaseTransceiver.md)[]

Defined in: window/WindowEventBus/index.ts:45

#### Parameters

##### ids

`string`[]

#### Returns

[`BaseTransceiver`](BaseTransceiver.md)[]

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`findWindowTransceiverByWindowIds`](WindowEventBus.md#findwindowtransceiverbywindowids)

***

### getUUID()

> **getUUID**(`url`): `any`

Defined in: window/client/index.ts:15

#### Parameters

##### url

`string`

#### Returns

`any`

***

### onMessage()

> **onMessage**(`data`): `void`

Defined in: core/EventBus/index.ts:105

#### Parameters

##### data

[`Signal`](../interfaces/Signal.md)

#### Returns

`void`

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`onMessage`](WindowEventBus.md#onmessage)

***

### removeEmitter()

> **removeEmitter**(`emiter`): `void`

Defined in: core/EventBus/index.ts:120

#### Parameters

##### emiter

[`EventBus`](EventBus.md)

#### Returns

`void`

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`removeEmitter`](WindowEventBus.md#removeemitter)

***

### removeWindowTransceiver()

> **removeWindowTransceiver**(`transceiver`): `void`

Defined in: window/WindowEventBus/index.ts:32

#### Parameters

##### transceiver

[`WindowTransceiver`](WindowTransceiver.md)

#### Returns

`void`

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`removeWindowTransceiver`](WindowEventBus.md#removewindowtransceiver)

***

### removeWindowTransceiverByWindow()

> **removeWindowTransceiverByWindow**(`win`): `void`

Defined in: window/WindowEventBus/index.ts:39

#### Parameters

##### win

`Window`

#### Returns

`void`

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`removeWindowTransceiverByWindow`](WindowEventBus.md#removewindowtransceiverbywindow)

***

### unBindTransceiver()

> **unBindTransceiver**(`transceiver`): `void`

Defined in: core/EventBus/index.ts:94

#### Parameters

##### transceiver

[`BaseTransceiver`](BaseTransceiver.md)

#### Returns

`void`

#### Inherited from

[`WindowEventBus`](WindowEventBus.md).[`unBindTransceiver`](WindowEventBus.md#unbindtransceiver)
