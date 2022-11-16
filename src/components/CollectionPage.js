import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Search from './Search';
import DeckPage from './DeckPage';
import FusedDeckPage from './FusedDeckPage';

/* const useStyles = makeStyles({

}); */

export default function CollectionPage(props) {

    //props
    const { handleSearchClick, collection } = props;

    //state
    const [ tab, setTab ] = React.useState(0);

    function TabPanel(props) {
        const { children, index } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={tab !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
          >
            {tab === index && (
              <Box sx={{ p: 3 }}>
                {children}
              </Box>
            )}
          </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <>        
            <Search fieldLabel="Username" buttonLabel="Import" handleSearchClick={handleSearchClick} />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tab} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Decks" {...a11yProps(0)} />
                    <Tab label="Fused Decks" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel index={0}>
                <DeckPage decks={collection.getDecks()} />
            </TabPanel>
            <TabPanel index={1}>
                <FusedDeckPage fusedDecks={collection.getFusedDecks()} />
            </TabPanel>

        </>
    )
}