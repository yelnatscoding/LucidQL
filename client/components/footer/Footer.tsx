import React from 'react';
import { packagejsonFile } from '../../downloadHelperFunctions/packagejsonFile';
import { connectToDB } from '../../downloadHelperFunctions/connectToDB';
import { schemaFile } from '../../downloadHelperFunctions/schemaFile';
import { serverFile } from '../../downloadHelperFunctions/serverFile';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { Navbar, Nav, Form, Button } from 'react-bootstrap';
import { AppState } from '../../App';

export const writeToDummyServer = (schema: string, link: string) => {
  const connectToDBFile = connectToDB(link);
  const toSchemaFile = schemaFile(schema);

  fetch('/db/pg/writefile', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ db: connectToDBFile, schema: toSchemaFile }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};

interface FooterProps {
  data: AppState;
  setData: React.Dispatch<React.SetStateAction<AppState>>;
}

const Footer: React.FC<FooterProps> = ({ data, setData }) => {
  const handleDownloadFiles = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const zip = new JSZip();

    zip.folder('lucidQL')?.file('package.json', packagejsonFile());
    zip.folder('lucidQL')?.file('server.js', serverFile());
    zip.folder('lucidQL')?.file('schema.js', schemaFile(data.schema));
    zip.folder('lucidQL')?.file('connectToDB.js', connectToDB(data.link));
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'lucidQL.zip');
    });
  };

  return (
    <Navbar className="footer" collapseOnSelect expand="lg" bg="" variant="">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Form className="d-inline">
            <Button
              id="downloadButton1"
              className="btn btn-light"
              style={{ marginRight: '5px' }}
              onClick={() => writeToDummyServer(data.schema, data.link)}
            >
              Push Schema to Server
            </Button>
            <Button
              id="downloadButton2"
              className="btn btn-light"
              onClick={handleDownloadFiles}
            >
              Download All Files
            </Button>
          </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Footer;
