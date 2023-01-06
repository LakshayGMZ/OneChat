import React, { useEffect, useState } from "react";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Divider, IconButton } from "@mui/material";

import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsIcon from '@mui/icons-material/Groups';

export default function MemberSelector(props) {
    const [memberList, setMembers] = useState([]);

    useEffect(() => {
        setMembers([
            { label: 'The Shawshank Redemption', id: 1990 },
            { label: 'The Godfather', id: 1972 },
            { label: 'The Godfather: Part II', id: 1974 },
            { label: 'The Dark Knight', id: 2008 },
            { label: '12 Angry Men', id: 1957 },
            { label: "Schindler's List", id: 1993 },
            { label: 'Pulp Fiction', id: 1994 }
        ])
    }, []);

    return (
        <div className="MemberSelectorPane">

            <div className="SearchBar">
                <Autocomplete
                    disablePortal
                    options={memberList}
                    renderInput={(params) => <TextField {...params} placeholder="Search" className="SearchBarTextField" sx={{ borderRadius: '10px' }} />}
                    fullWidth
                />
            </div>
            <div className="MemberList">
                <MemberBox />

            </div>
            <div className="UserStatusBar">
                {/* <div className="UserStatusIcon">
                    <IconButton size="large">
                        <LogoutIcon fontSize="inherit" />
                    </IconButton>
                </div> */}

                <div className="UserStatusIcon">
                    <IconButton size="large">
                        <SettingsIcon fontSize="inherit" />
                    </IconButton>
                </div>

            </div>
        </div>
    )


    function MemberBox(props) {

        return (
            <div className="MemberBoxContainer">
                <div className="MemberPfpArea">
                    <GroupsIcon fontSize="large" />
                </div>
                <div className="MemberNameHolder">
                    <span>Everyone</span>
                </div>


            </div>
        )
    }
}