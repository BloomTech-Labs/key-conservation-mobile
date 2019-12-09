import React  from 'react';
import View from "react-native-web/dist/exports/View";
import {TextInput} from "react-native-gesture-handler";
import useInputState from "../../screens/org-onboarding-screens/hooks/useInputState";


export const  MapSearchInput = ({filterName, doSearch})=>{
	const [value, handleChange, reset] = useInputState();
	return(
		<View>
			<form
				onSubmit={e => {
					e.preventDefault();
					// addTodo(value);
					reset();
				}}>
				<TextInput
					value={value}
					onChange={handleChange}
					margin='normal'
					label='Add Search'
				/>
			</form>
		</View>
	)
}

