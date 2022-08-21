import { AuthSession } from '@supabase/supabase-js'
import Link from 'next/link'
import { Attribute, AttributeType, Condition } from '../types/ash'
import { GetAttributes, GetAttributeTypes, GetConditions } from '../utils/hooks/useAttribute'
import AttributeCard from './AttributeCard'


export interface Props {
    session: AuthSession
}


// TODO: figure out how the hell this works (been working 18 hours now and can't fathom)
function attributeMagick(
    attribute: {
        id: number;
        created_at?: string | undefined;
        notes?: string | undefined;
        room_id?: number | undefined;
        condition_id?: number | undefined;
        attribute_type_id?: number | undefined;
    }): JSX.Element {
    return <AttributeCard
        key={attribute.id}
        id={attribute.id}
        notes={attribute.notes}
        created_at={attribute.created_at}
        room_id={attribute.room_id}
        condition_id={attribute.condition_id}
        attribute_type_id={attribute.attribute_type_id}
    />
}




export default function AttributeList({ session }: Props) {
    const { loading, error, attributes } = GetAttributes(session)

    const listOfAttributes = attributes ? attributes.map((attribute: Attribute) => {
        return (
            attributeMagick(attribute)
        )

    }) : null


    return (
        <>
            <h1>Attributes</h1>
            <h4>Total: {listOfAttributes?.length}</h4>

            {listOfAttributes}

            <h4>Total: {listOfAttributes?.length}</h4>

        </>
    );
}



export function AttributeOptions({ session }: Props) {
    const { loading, error, attributes } = GetAttributes(session)

    const attributeOptions = attributes ?
        attributes.map((attribute: Attribute) => {
            return (
                <option key={attribute.id} value={attribute.id}>{attribute.id} | {attribute.notes}</option>
            )

        }) : <option value="0">No attributes found</option>

    return (
        <>
            {attributeOptions}
        </>
    );

}


export function AttributeTypeOptions({ session }: Props) {
    const { loading, error, attributeTypes } = GetAttributeTypes(session)

    const attributeTypeOptions = attributeTypes ?
        attributeTypes.map((attributeType: AttributeType) => {
            return (
                <option key={attributeType.id} value={attributeType.id}>{attributeType.id} | {attributeType.name}</option>
            )

        }) : <option value="0">AttributeTypeless</option>

    return (
        <>
            {attributeTypeOptions}
        </>
    );

}




export function ConditionOptions({ session }: Props) {
    const { loading, error, conditions } = GetConditions(session)

    const conditionsOptions = conditions ?
        conditions.map((condition: Condition) => {
            return (
                <option key={condition.id} value={condition.id}>{condition.id} | {condition.name}</option>
            )

        }) : <option value="0">just came to see the condition my condition was in</option>

    return (
        <>
            {conditionsOptions}
        </>
    );

}



