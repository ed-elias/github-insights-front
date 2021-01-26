import React from 'react';
import MaterialTable, { Column } from 'material-table';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

interface Row {
  login:string,
  commits:number,
  additions:number,
  deletions:number
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}

type UserData = {
  login:string,
  commits:number,
  additions:number,
  deletions:number
} 


 const MaterialTableDemo = (props:{users:UserData[], dataStatus:any}) => {
  const [loaded, setLoaded] = React.useState(() => { return false })


  const theme = createMuiTheme({
    overrides: {
      MuiTableSortLabel: {
        root: {
          color: '#fff',
          '&:hover': {
            color: '#bbdefb',
          },
          '&$active': {
            color: '#bbdefb',
            '&& $icon': {
              opacity: 1,
              color: '#bbdefb'
            },
          },
        },
      },
    },
  });

  const [state, setState] = React.useState<TableState>({
    columns: [
      { title: 'User', field: 'login', type: 'string' },
      { title: 'N° commits', field: 'commits', type: 'numeric' },
      { title: 'Additions', field: 'additions', type: 'numeric' },
      { title: 'Deletions', field: 'deletions', type: 'numeric' },
    ],
    data: [],
  });
  
  if(props.dataStatus.loaded && props.dataStatus.parsed && !loaded){
    setLoaded(true)
    setState(prev => {
      let data = Object.assign({}, prev)
        let commits: UserData[] = [];
      props.users.forEach(user => {
         commits.push(user)
      })
        data.data = commits;
        return data
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
          title={"GitHub Insights "}
        columns={state.columns}
        data={state.data}
        isLoading={!loaded}
        options={{
          headerStyle: {
            backgroundColor: '#01579b',
            color: '#ffffff',
          },
        }}
      />
    </ThemeProvider>
  );
}

export default MaterialTableDemo
