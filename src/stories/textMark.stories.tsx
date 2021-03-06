import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from 'antd';
import { State, Store } from '@sambego/storybook-state';
import TextMark from '../components/textMark';
import { PropsTable } from './components/propsTable';
import './style';

const propDefinitions = [{
    property: 'text',
    propType: 'string',
    required: false,
    description: '文本数据',
    defaultValue: ''
}, {
    property: 'markText',
    propType: 'string',
    required: false,
    description: '需要标记的文本',
    defaultValue: ''
}]
const store = new Store({
    val: undefined
})
const stories = storiesOf('TextMark 文本标记', module);
stories.add('textMark', () => {
    store.subscribe((state: any) => { console.log() })
    return (
        <div className='story_wrapper'>
            <h2>何时使用</h2>
            <p>文本标记</p>
            <h2>示例</h2>
            <Input placeholder='测试以下文本数据' style={{ width: '200px' }} onChange={(e) => {
                store.set({ val: e.target.value })
            }} />
            <br />
            <State store={store}>
                {state => <TextMark
                    className='story-text-mark'
                    title={'testTitle'}
                    text={'testText'}
                    markText={state.val}
                />}
            </State>
            {/* Prop Types 无法识别 State 回调的 TextMark，这里做下处理 */}
            <TextMark style={{ display: 'none' }} />
        </div>
    )
}, {
    info: {
        text: `
        代码示例：
        ~~~js
        import { TextMark } from 'dt-react-component'
        <TextMark
            title='testTitle'
            text='testText'
            markText='test'
        />
        ~~~
        `,
        TableComponent: () => PropsTable({ propDefinitions }),
        propTablesExclude: [State, Input]
    }
})
