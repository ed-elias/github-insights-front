import React, { useState } from 'react'

import {FormControl, Grid, InputLabel, MenuItem} from '@material-ui/core';

import UsersTable from './UsersTable'

import { useQuery } from '@apollo/client'
import { getRepoCommitInfoPaginated } from '../queries/queries'
import Select from '@material-ui/core/Select';

type UserData = {
    login:string,
    commits:number,
    additions:number,
    deletions:number
}

const LinuxStats = () => {
    const [loaded, setLoaded] = React.useState(() => { return '' })

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        let newValue = event.target.value as string
        if( newValue !== loaded){
            setLoaded(newValue);
            fetch(newValue)

        }
    };
    const fetch = (newValue: string) => {
        setDataStatus({loaded:false, parsed:false})
        fetchMore({
            variables: {
                orderBy: newValue
            },
        }).then( fetchData => {
            reloadData()
            parsedUserData.push({...fetchData.data , ...fetchData.data.user})
            setDataStatus({loaded:true, parsed:true})
        })
    }


    const reloadData = () =>  {
        let usersCommitStats:UserData[] = []
        setUsersParsedData(usersCommitStats)
        setDataStatus({loaded:false, parsed:false})
    }

    const [dataStatus, setDataStatus] = useState(() => {
        return {loaded:false, parsed:false, }
    })
    const [parsedUserData, setUsersParsedData] = useState(() => {
        let usersCommitStats:UserData[] = []
        return usersCommitStats
    })

    const { loading, error, data, fetchMore } = useQuery(getRepoCommitInfoPaginated,{
        variables:{
            orderBy: loaded
        }
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(, Algo não deu certo /o\ por favor verifique no console das ferramentas de desenvolvedor de seu navegador</p>;
    if (data.hasOwnProperty('getInsights') && !dataStatus.loaded) {
        if( parsedUserData.length ===1 ) parsedUserData.pop()
        data.getInsights.forEach((commitData: any) => {
            parsedUserData.push({...commitData , login: commitData.user.login})
        })
        setDataStatus({loaded:true, parsed:true })
    }

    return (
        <Grid container
              direction="row"
              justify="center"
              alignItems="center"
        >
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center"
            >
                <Grid item  xs={12} sm={10} md={8} style={{padding: "20px", textAlign:"center"}}>
                    <FormControl variant="outlined" style={ {minWidth: 150}} className={'a'} >
                        <InputLabel id="demo-simple-select-outlined-label">Results by</InputLabel>
                        <Select  onChange={ handleChange}
                                 labelId="demo-simple-select-outlined-label"
                                 id="demo-simple-select-outlined"
                                 label="Order by"
                                 value={loaded}
                        >
                            <MenuItem value={'commits'}>Commits</MenuItem>
                            <MenuItem value={'additions'}>Additions</MenuItem>
                            <MenuItem value={'deletions'}>Deletions</MenuItem>
                        </Select>
                    </FormControl>

                </Grid>
            </Grid>
            <Grid item xs={12} sm={10} md={8} style={{padding: "20px"}}>
                <UsersTable users={parsedUserData} dataStatus={dataStatus} />
            </Grid>
        </Grid>
    );

}

export default LinuxStats
