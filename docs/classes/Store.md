[**cross-domain-emitter**](../README.md)

***

Defined in: core/store/index.ts:2

## Extends

- [`EventBus`](EventBus.md)

## Constructors

### Constructor

> **new Store**(): `Store`

#### Returns

`Store`

#### Inherited from

[`EventBus`](EventBus.md).[`constructor`](EventBus.md#constructor)

## Properties

### emitters

> **emitters**: [`EventBus`](EventBus.md)[] = `[]`

Defined in: core/EventBus/index.ts:9

#### Inherited from

[`EventBus`](EventBus.md).[`emitters`](EventBus.md#emitters)

***

### id

> **id**: `string`

Defined in: core/EventBus/index.ts:7

#### Inherited from

[`EventBus`](EventBus.md).[`id`](EventBus.md#id)

***

### store

> **store**: `Record`\<`string`, `unknown`\> = `{}`

Defined in: core/store/index.ts:3

***

### transceivers

> **transceivers**: [`BaseTransceiver`](BaseTransceiver.md)[] = `[]`

Defined in: core/EventBus/index.ts:8

#### Inherited from

[`EventBus`](EventBus.md).[`transceivers`](EventBus.md#transceivers)

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

[`EventBus`](EventBus.md).[`addEmitter`](EventBus.md#addemitter)

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

[`EventBus`](EventBus.md).[`bindTransceiver`](EventBus.md#bindtransceiver)

***

### clearTransceiver()

> **clearTransceiver**(): `void`

Defined in: core/EventBus/index.ts:102

#### Returns

`void`

#### Inherited from

[`EventBus`](EventBus.md).[`clearTransceiver`](EventBus.md#cleartransceiver)

***

### emit()

> **emit**(`eventName`, `data?`, `option?`, `transceivers?`): `Store`

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

`Store`

#### Inherited from

[`EventBus`](EventBus.md).[`emit`](EventBus.md#emit)

***

### get()

> **get**(`key`): `unknown`

Defined in: core/store/index.ts:9

#### Parameters

##### key

`string`

#### Returns

`unknown`

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

[`EventBus`](EventBus.md).[`onMessage`](EventBus.md#onmessage)

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

[`EventBus`](EventBus.md).[`removeEmitter`](EventBus.md#removeemitter)

***

### set()

> **set**(`key`, `value`): `void`

Defined in: core/store/index.ts:4

#### Parameters

##### key

`string`

##### value

`unknown`

#### Returns

`void`

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

[`EventBus`](EventBus.md).[`unBindTransceiver`](EventBus.md#unbindtransceiver)
