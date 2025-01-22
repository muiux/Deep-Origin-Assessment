import React from "react";
import { Badge, Button, Checkbox, Mask, Table } from "react-daisyui";

const TestTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <Table className="rounded-box">
        <Table.Head>
          <Checkbox />
          <span>Name</span>
          <span>Job</span>
          <span>Favorite Color</span>
          <span />
        </Table.Head>

        <Table.Body>
          <Table.Row>
            <Checkbox />
            <div className="flex items-center space-x-3 truncate">
              <Mask variant="squircle" src="https://img.daisyui.com/images/profile/demo/2@94.webp" />
              <div>
                <div className="font-bold">Hart Hagerty</div>
                <div className="text-sm opacity-50">United States</div>
              </div>
            </div>
            <div>
              Zemlak, Daniel and Leannon
              <br />
              <Badge color="ghost" size="sm">
                Desktop Support Technician
              </Badge>
            </div>
            <div>Purple</div>
            <Button color="ghost" size="xs">
              details
            </Button>
          </Table.Row>

          <Table.Row>
            <Checkbox />
            <div className="flex items-center space-x-3 truncate">
              <Mask variant="squircle" src="https://img.daisyui.com/images/profile/demo/3@94.webp" />
              <div>
                <div className="font-bold">Brice Swyre</div>
                <div className="text-sm opacity-50">China</div>
              </div>
            </div>
            <div>
              Carrol Group
              <br />
              <Badge color="ghost" size="sm">
                Tax Accountant
              </Badge>
            </div>
            <div>Red</div>
            <Button color="ghost" size="xs">
              details
            </Button>
          </Table.Row>

          <Table.Row>
            <Checkbox />
            <div className="flex items-center space-x-3 truncate">
              <Mask variant="squircle" src="https://img.daisyui.com/images/profile/demo/4@94.webp" />
              <div>
                <div className="font-bold">Marjy Ferencz</div>
                <div className="text-sm opacity-50">Russia</div>
              </div>
            </div>
            <div>
              Rowe-Schoen
              <br />
              <Badge color="ghost" size="sm">
                Office Assistant I
              </Badge>
            </div>
            <div>Crimson</div>
            <Button color="ghost" size="xs">
              details
            </Button>
          </Table.Row>

          <Table.Row>
            <Checkbox />
            <div className="flex items-center space-x-3 truncate">
              <Mask variant="squircle" src="https://img.daisyui.com/images/profile/demo/5@94.webp" />
              <div>
                <div className="font-bold">Yancy Tear</div>
                <div className="text-sm opacity-50">Brazil</div>
              </div>
            </div>
            <div>
              Wyman-Ledner
              <br />
              <Badge color="ghost" size="sm">
                Community Outreach Specialist
              </Badge>
            </div>
            <div>Indigo</div>
            <Button color="ghost" size="xs">
              details
            </Button>
          </Table.Row>
        </Table.Body>

        <Table.Footer>
          <span>&nbsp;</span>
          <span>Name</span>
          <span>Job</span>
          <span>Favorite Color</span>
          <span>&nbsp;</span>
        </Table.Footer>
      </Table>
    </div>
  );
};

export default TestTable;
