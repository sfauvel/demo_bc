
import React from 'react'
import Transaction from './Transaction'

import {trunkId} from './Tools'

export default class About extends React.Component {
	
//	Blockchain
//
//	L'utilisateur soumet des transactions en indiquant un nom et des coordonnées X et Y. 
//	La valeur X doit être supérieure à la valeur Y.
//	L'application ne contrôle pas cette contrainte, ce sera le rôle des mineurs de le faire.
//	
//	Les mineurs visualisent la blockchain. 
//	Ils sélectionnent le dernier bloc qu'il considère valide ainsi que les transactions qu'ils veulent inclure au prochain bloc.
//	Pour les aider, un symbole '!' signale les transactions invalides (X inférieur ou égal à  Y)
//	Le choix d'un bloc met en évidence la liste des blocs dont il est issue. 		
//	
//	Ils doivent également indiquer un chiffre avant de soumettre leur bloc.
//	Les valeurs acceptable sont déterminées par les données soumises mais elles ne sont pas prédictible.
//	Le mineur peut faire autant de tentatives qu'il souhaite jusqu'à trouver un valeur acceptable.
//  
	
	render() {
   return (
    	<div className="about">
    	<h2>Blockchain</h2>
    	<p>L'utilisateur soumet des transactions en indiquant un nom et des coordonnees X et Y. 
    	La valeur X doit etre superieure a la valeur Y.
    	L'application ne controle pas cette contrainte, ce sera le role des mineurs de le faire.
    	</p>
     
    	<p>Les mineurs visualisent la blockchain. 
    	Ils selectionnent le dernier bloc qu'il considere valide ainsi que les transactions qu'ils veulent inclure au prochain bloc.
    	Pour les aider, un symbole '!' signale les transactions invalides (X inferieur ou egal a  Y)
    	Le choix d'un bloc met en evidence la liste des blocs dont il est issue. 		
    	</p>
    	
    	<p>Ils doivent egalement indiquer un chiffre avant de soumettre leur bloc.
    	Les valeurs acceptable sont determinees par les donnees soumises mais elles ne sont pas predictible.
    	Le mineur peut faire autant de tentatives qu'il souhaite jusqu'a trouver un valeur acceptable.
    	</p>
    	</div>
    )
  }
}
