import {Interfaces, OptionalPerson, Todo, Character} from "./Interfaces";

// ==============================================================================================================

// Partial<T> : 全てのプロパティをOptional（任意）にしてくれる

type OptionalPersonByPartial = Partial<Interfaces>

const taro: OptionalPersonByPartial = {
    firstName: 'Taro',
}

// Partial<Interfaces>　と　PersonOptional　は同じ振る舞い
const erikko: OptionalPerson = {
    firstName: 'erikko',
}

// 【注意点】
// 　・当然ながら型が緩くなってしまう
//　 ・一部のプロパティだけOptionalにすることはできない（Pick, Omitの使用を検討する）

// ==============================================================================================================

// Required<T> : 全てのプロパティを必須にしてくれる
const ichiro: Required<OptionalPerson> = {
    firstName: 'Ichiro',
    lastName: 'Sato',
    age: 3
}

// Required<PersonOptical>　と　Interfaces　は同じ振る舞い
const jiro: Interfaces = {
    firstName: 'Jiro',
    lastName: 'Sato',
    age: 3
}

// ==============================================================================================================

// Readonly<T> : 全てのプロパティをreadonlyにしてくれる。プロパティの更新ができなくなる
const saburo: Readonly<Interfaces> = {
    firstName: 'Saburo',
    lastName: 'Ito',
    age: 5
}

// Error: TS2540: Cannot assign to 'lastName' because it is a read-only property.
// saburo.lastName = 'Goto'

// ==============================================================================================================

//Record<K, T> : KがプロパティとなりT型を持つレコードを構築する

// K : オブジェクトのプロパティーキーの型を指定
// T : オブジェクトのプロパティの値の型を指定

type CharacterRecordType = Record<number, Character>

const CharacterRecord: CharacterRecordType = {
    99: {
        id: 99,
        name: "キルア=ゾルディック",
        age: 12
    },
    2: {
        id: 403,
        name: "レオリオ=パラディナイト",
        age: 19
    }
}

// ==============================================================================================================

// Pick<T, K> : すでに存在するT型の中から、Kで選択した一部のプロパティのみを含んだ新たな型を構築できる

type TodoPreview1 = Pick<Todo, 'title' | 'completed'>

const preview1: TodoPreview1 = {
    title: '部屋の掃除',
    completed: false,
}

// 注意点
//   ❶Todoのプロパティが変更になった場合

// ==============================================================================================================

// Omit<T, K> : すでに存在するT型の中からKで選択した一部のプロパティを除いた新たなプロパティを構築する

type TodoPreview2 = Omit<Todo, 'description'>

const preview2: TodoPreview2 = {
    title: '90研修の資料作成',
    completed: false
}

// 注意点
//   ❶Todoのプロパティが変更になった場合
//   ❷Todoに新たなプロパティが追加された場合

// ==============================================================================================================

// Exclude<T, U> : T型のプロパティでU型に共通するプロパティを除いた型を構築する

type pullRequestState = 'draft' | 'reviewed' | 'rejected'| 'open'

type successState = 'draft' | 'rejected'

type successMergeState1 = Exclude<pullRequestState, successState>

const yourMergeState1: successMergeState1 = 'reviewed'

// Error : Type '"draft"' is not assignable to type '"reviewed"'.
// const yourMergeState1: successMergeState = 'draft'

// 注意点
//   ❶pullRequestStateに新しいStateが追加された場合
//   ❷pullRequestStateのStateを変更した場合

// ==============================================================================================================

// Extract<T, U> : T型のプロパティでU型に共通するプロパティのみを残した型を構築する

// type successMergeState2 = Extract<pullRequestState, 'reviewed'>
type successMergeState2 = Extract<pullRequestState, 'reviewed'>

const yourMergeState2: successMergeState2 = 'reviewed'

// Error : Type '"draft"' is not assignable to type '"reviewed"'.
// const yourMergeState2: successMergeState = 'draft'


// 関数の型だけを取り出すなどができる
type functionType1 = () => void;
type functionType2 = () => number;
type functionUnion = functionType1 | functionType2 | number;
type functionType3 = Extract<functionUnion, Function>;

// 【注意点】
//   ❶pullRequestStateに新しいStateが追加された場合
//   ❷pullRequestStateのStateを変更した場合

// ==============================================================================================================

// NonNullable<T> : T型からnullとundefinedを取り除いた型を構築する

type testTypes = string | number | null | undefined
type nonNullType = NonNullable<testTypes>
const name: nonNullType = 'yusuke'

// Error :  Type 'null' is not assignable to type 'nonNullType'.
// const age: nonNullType = null

// ==============================================================================================================

// Parameters<T> : T型に渡した関数の引数の型をタプルとして抽出した型を構築する

// 【使い所】サードパーティの関数を利用するとき、誤ったパラメータを渡さないように型をガチッと指定する

// ポテト料理を返すサードパーティの関数
const makePotato = (materials: string[], quantity: number): string[] => {
    const dinner: string[] = []

    Array.from(Array(quantity)).forEach(_ => {
        if (materials.includes('salt')) {
            dinner.push('FriedPotato')
        } else if (materials.includes('salad')) {
            dinner.push('Jagariko')
        } else {
            dinner.push('🥔')
        }
    })

    return dinner
}

// パラメータの型をしっかり作っておく [[string[], number]]
type makePotatoParameter = Parameters<typeof makePotato>

// 関数から作った返り値の型を使えば、わざわざ型を自作する必要がない
const recipe: makePotatoParameter = [['tomato', 'beef', 'pepper'], 7]

// 確実に実行できる
console.log(makePotato(...recipe))

// ==============================================================================================================

// ReturnType<T> : 関数方Tの返り値の型を返す

// 【使い所】サードパーティの関数を利用するとき、返り値から誤った型のオブジェクトを生成しないように型をガチッと指定する

type makePotatoReturnDinner = ReturnType<typeof makePotato>

const todayDinner: makePotatoReturnDinner = makePotato(...recipe)
