import React, { Component } from 'react';
import { Paper, Button } from '@material-ui/core';
const imgSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAAAjCAYAAADR94eaAAAFT0lEQVRoge1azYrjRhDWI/gR9AJZ13RPYJOTDksuuZg9JZAFP4IfwW+gYw7JokNCCOSgQAiyWuquzSQQ2Iv3lA2EQYSZS2YPegTnIMmjn6pWS7Zv0yAWxu1S99dffV91eT3vaTyN9vgYEYTWW2nMXhpTSGPwGjEERP9iLwXEBSgFMk9XkCXB2eIqBZAlAWDik5+d4Z1C641EjGWerwBx4XmeB4i+0HojjSkkYtT8/awDsiQQOj20H5mnq9nxEBdCp3E3ZrJuzxE6LTrvM+l+6nuE1luh9dY2RyJG0pji7MAJvdv0QRM6LefHUxER79BeuNBpOZyz23AxVxgvXmAcBPhL4HmeJ/N8dY0YuqxHGoPSGJy7H3K4bHJaPAqQ9NCkISgF1OdCq6gfa43R4uVvP4afv/lp/9mbn+MAf42eY1pI1M5pB4gLacxB5vns7KE2GdOgDbXIZYE0II+gyTxdMXMGzPni5vvoJf6wWWF8BOhTVDAVgGvEUBqzF1pvqrT+fQv45+T9HUdfX05PTzJe8fg5KQcD3Xt183r9JX43AOcTTFdTswAQfWlMKY1BiRhL88de6LeHK/MOAd/7kzYImPjUBuYI8zFmz1ikSfegFDSfc8zum8+rm9drKv5znOe2faBBvQWh38Wg3x8g+8c9JuWcnL5MXaDM0xUoBf3FMkwcyMFXN9+SKRic2QlB/x2Cvi0BC390sufZUoV3slMHo2dFe84av/bX+E1wqTX0B+jbeJnfuTks55yn1GnWxTHOeWXUeUuCqevCYrHM7w4f5f+N73vMOSFLApEl2xrcuPq3K9jdl1e3C+4mMMU5q3iJX2dDKLJka3P0RhIG6x353vH7+j5c5g/jssQ5Z1U60Cw8ijuhLVdGoc1QXJ2zNXdQ8/WvXXWZE1Jzp+g0ZHfBs/zBXjVwzlkDSYr1mMPS33vUR1fnFDpZ8yA8AmyfN10GnuUPB8CSNxreOd2fdinBV/ppbAe165x1HAaI1gFkyXbeunl5WeYPe1AlcJ9bUmXCkyXbJp6LXnHMPgJWsZ9jeeiydmnSfc1oLs7xEGeApiIbjZsaq2bk6ALG9GrMOQFx0ddECrAaWIqJ5TDNSTnolDcD0JLSt4BG64vQaTwsSJM1PfdRXMfKlzEm8utRUa9D4qSL3Lptt51l/mC/CXHsaetUM1xSj2NJo1c2JnL61HfpKR0Sz2N1j0xPUPewzD+wqTv5zulSKjCH0Lqo0wzhwKbKGg5c6qBZZ23pcAeT7N+ttbideuccSz2XSp9jNvMUVEFKxWgfdEuDQz7usL4ELBZLfW8vbKfeOTmWNBs7wTmZZ3h4tl5dzaixeq2kGOl5ngf6dgPqnnfNagN25hCgjaTePOesywNyk32mWerA0efKKOSuUpD/tXJqDY0xpxOU0b9e6tHxHLq1fOnTZduMYrys9HK34ZqWgHvfuQnJMIe8d1kWG47Ec3JOa4u8dYg88CqqwE/D6j27DdXHO2m4MKcLsJNzUnoy6pwNEy2F9rEE4EGz9/7OAp4Lc9pjrnOKCXdOK9tq8ebn2LsXQquI68o4jyntmXrDl3LOovse5nBaJQXD6EG7yPMakDsx2euTA2h25hCgUSw52Tn7cmBjW7M2231Z6DSsCtpkLZj+2my2jTGnu5HTnZO/tw7lwNLuKceAdXjKU0CzMqcD2oWdc3hIuODiNYJvkQMrYLY+mnVwJ3Vu5+zpkJWJgzVW6UwBVzroKLm3k38oqtKlqmfadQ25geMPG735nVYNEa8FSAVCP8b4qVfAdL837JftNsSFv2wakdUPPBf4r1ZPgx7/A2x793GV3E6BAAAAAElFTkSuQmCC';

export default class Settings extends Component {

  constructor(props){
    super(props)
    this.state = {
      is_synched: this.props.syncStatus
    }
  }
  componentDidMount(){
    console.log(this.props.syncStatus);
    // let query = new URLSearchParams(this.props.location.search).get("synched");
    // console.log(query);
  }

  syncRecords(e){
    let session = localStorage.getItem('JWBSID');
    e.preventDefault();
    window.location.href=`https://api.baghalati.com/api/pos/hikeup-authorize?user_token=${session}`;
  }

  render() {
    return (
      <Paper elevation={1} className="jwb-dashboard-settings" >
        <div>
          <h4> Settings </h4>
        </div>
        <div className="jwb-dashboard-settings-hikeup">
          <img src={imgSrc} alt="hikeup" />
          <p> HikeUp is your system of records, to sync your database with HikeUp please click the button below</p>
          { 
          this.state.is_synched ? (<h4>Your Store is Connected</h4>) : (<Button variant="contained" color="primary" onClick={this.syncRecords}>Sync</Button>)
          }
          
        </div>
      </Paper>
    );
  }
}
